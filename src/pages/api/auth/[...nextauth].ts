import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

console.log(process.env);


export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    })
  ]
})