'use client';
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesPage = () => {
  return (
    <div>
      <Button>
        <Link href={'/issues/new'}>New</Link>
      </Button>
    </div>
  )
}

export default IssuesPage