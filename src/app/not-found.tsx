import { OctagonX } from 'lucide-react'

import { MainNav } from '@/components/next-description'

const NotFound = () => (
  <MainNav
    top={
      <h4 className="flex items-center gap-2 text-red-600">
        <OctagonX />
        Page not found
      </h4>
    }
  />
)

export default NotFound
