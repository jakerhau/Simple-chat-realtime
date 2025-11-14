import { Amplify } from 'aws-amplify';


if (typeof window !== 'undefined') {
  // Only configure on client side
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: process.env.NEXT_PUBLIC_APPSYNC_API_URL || '',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
        defaultAuthMode: 'apiKey', // or 'iam', 'userPool', 'oidc'
        apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY || '',
      },
    },
  });
}

// Export function for manual configuration if needed
export const configureAmplify = () => {
  Amplify.configure({
    API: {
      GraphQL: {  
        endpoint: process.env.NEXT_PUBLIC_APPSYNC_API_URL || '',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
        defaultAuthMode: 'apiKey', // or 'iam', 'userPool', 'oidc'
        apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY || '',
      },
    },
  });
};

