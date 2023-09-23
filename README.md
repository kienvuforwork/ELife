# Elife

## Technology and library used 
- React
- Nextjs 13
- Typescript
- Tailwindcss
- Redux with redux toolkit

## Explain some architecture concepts and how technologies in this project work.
1. How i used redux and redux toolkit with Nextjs

 In common react application we can wrap the entire app with Provider from react-redux but with Nextjs 13 we have to deal with things called client component and
 server component. By default my entire application is in the layout.tsx which by default should be a server component while the redux and others state management library
 is client component. So to use the Provider in the layout.tsx we have to convert that to client component which is break the Nextjs concept.
 
 Solution: I created a new ReduxProvider used client side and wrap the application with that provider.


   
   
