type SpinnerProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    spinnerColor?: string;
  };
  
  export const Spinner = ({ size = 'md', spinnerColor = 'white' }: SpinnerProps) => {
    switch (size) {
      case 'xs':
        return <div className={` mx-auto h-4 w-4 animate-spin rounded-full border-t-2 border-${spinnerColor}`}></div>;
      case 'sm':
        return <div className={` mx-auto h-6 w-6 animate-spin rounded-full border-t-2 border-${spinnerColor}`}></div>;
      case 'md':
        return <div className={` mx-auto h-8 w-8 animate-spin rounded-full border-t-2 border-${spinnerColor}`}></div>;
      case 'lg':
        return <div className={` mx-auto h-10 w-10 animate-spin rounded-full border-t-4 border-${spinnerColor}`}></div>;
      case 'xl':
        return <div className={` mx-auto h-12 w-12 animate-spin rounded-full border-t-4 border-${spinnerColor}`}></div>;
    }
  }