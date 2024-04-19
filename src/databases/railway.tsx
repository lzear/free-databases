import { DeadProvider } from '../todo-providers'
// import { pgImplementation } from '../with-pg'

export const railway = {
  name: 'Railway',
  slug: 'railway',
  // server: pgImplementation(process.env.RAILWAY_DATABASE_URL),
  icon: 'railway.svg',
  description: (
    <>
      <p>
        Railway is an infrastructure platform where you can provision
        infrastructure, develop with that infrastructure locally, and then
        deploy to the cloud.
      </p>
      <p>
        I think it&apos; still free, but my database was deleted on January 2024
        after I didn&apos;t do a required action.
      </p>
    </>
  ),
  dead: (
    <>
      DATABASE DELETED (<em>&ldquo;ACTION REQUIRED&rdquo;</em>)
    </>
  ),
} satisfies DeadProvider
