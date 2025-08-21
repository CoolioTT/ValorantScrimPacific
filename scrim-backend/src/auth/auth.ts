import passport from 'passport';
import { Strategy } from 'passport-discord';
import jwt from 'jsonwebtoken';

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auth/discord/callback',
      scope: ['identify'],
    },
    (accessToken, refreshToken, profile, done) => {
      const token = jwt.sign(
        { id: profile.id, username: profile.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      return done(null, token);
    }
  )
);
