declare module 'lucide-react' {
  import React from 'react';

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    stroke?: string | number;
  }

  export type Icon = React.FC<IconProps>;

  export const Menu: Icon;
  export const MessageSquare: Icon;
  // Add any other icons you're using from lucide-react here
}

