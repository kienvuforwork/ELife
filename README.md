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

2. Why i do not create a model for tvshow and track?
   The track and the tvshow in this app always come with user so i attach it to user. The popular track and the tv Show come from 3rd api.
   Pros : fast query
   Cons: duplication data, if we quere user and only need the infor of the user there also redundency data
   Im just devleoping an app as a personal project so i choose the first approach which is simple
   
   
