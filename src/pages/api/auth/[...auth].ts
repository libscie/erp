import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import db from "db"
// https://www.passportjs.org/packages/passport-github2/
import passportGithub2 from "passport-github2"
import { Role } from "types"

export default api(
  passportAuth(({ ctx, req, res }) => ({
    successRedirectUrl: "/",
    errorRedirectUrl: "/",
    strategies: [
      {
        // see also
        // https://github.com/libscie/ResearchEquals.com/blob/main/pages/api/auth/%5B...auth%5D.ts
        strategy: new passportGithub2(
          {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.APP_ORIGIN}/api/auth/github/callback`,
          },
          async function (accessToken, refreshToken, profile, done) {
            console.log(profile)

            let user
            try {
              user = await db.user.findFirstOrThrow({
                where: {
                  handle: profile._json.login,
                },
              })
            } catch (e) {
              console.log("Creating new user...")
              user = await db.user.create({
                data: {
                  name: profile.displayName,
                  handle: profile._json.login,
                  email: profile._json.email,
                  avatar: profile._json.avatar_url,
                },
              })
            }

            return done(null, {
              publicData: {
                userId: user.id,
                role: user.role as Role,
              },
            })
          }
        ), // Provide initialized passport strategy here
      },
    ],
  }))
)
