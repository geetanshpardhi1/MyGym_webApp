import React from 'react'
import MemberContent from '../MemberContent'
import MembershipCard from './MembershipCard'

const MembershipMain = () => {
  return (
    <>
    <MemberContent>
      <div className="flex flex-col gap-5 min-h-screen">
        <MembershipCard />
      </div>
    </MemberContent>
    ;
  </>
  )
}

export default MembershipMain