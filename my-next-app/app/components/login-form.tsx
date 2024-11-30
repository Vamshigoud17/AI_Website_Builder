'use client'

import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const handleEmailLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log(email,password)
    try {
      console.log("Attempting login with email:", email, "and password:", password);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home')
      console.log("Login successful!");
      // Redirect or update UI upon successful login
    } catch (error) {
      console.error("Login error:", error);  // Log the full error to see what went wrong
      setError('Failed to log in. Please check your credentials.');
    }
    
  };

  const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider) => {
    try {
      const router=useRouter();
      await signInWithPopup(auth, provider);
      router.push('/signup');
      // Redirect or update UI upon successful login
    } catch (error) {
      setError('Failed to log in with social provider.');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</Button>
              <Link href="/signup" className="text-sm text-blue-600 hover:underline">Sign-up</Link>
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

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

