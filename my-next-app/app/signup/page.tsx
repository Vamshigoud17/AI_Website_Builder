"use client"

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import Link from 'next/link'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.length !== 10) {
      setErrorMessage('Mobile number must be 10 digits')
      return
    }
    try {
      console.log(email,password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        mobile
      })
      router.push('/home')
    } catch (error: unknown) {
      console.error('Signup error:', error)
      setErrorMessage('Failed to create an account. Please try again.')
    }
  }
  const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider) => {
    try {
      const router=useRouter();
      await signInWithPopup(auth, provider);
      router.push('/sample');
      // Redirect or update UI upon successful login
    } catch (error) {
      setError('Failed to log in with social provider.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign up for an account</h3>
        <form onSubmit={handleSignup}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">Name</label>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="mobile">Mobile Number</label>
              <Input
                type="tel"
                placeholder="Mobile Number"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
                pattern="[0-9]{10}"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Sign Up</Button>
              <Link href="/" className="text-sm text-blue-600 hover:underline">Login</Link>
            </div>

          </div>
        </form>
        <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" onClick={() => handleSocialLogin(new GoogleAuthProvider())}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" onClick={() => handleSocialLogin(new FacebookAuthProvider())}>
          <Icons.facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        <Button variant="outline" onClick={() => handleSocialLogin(new GithubAuthProvider())}>
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}