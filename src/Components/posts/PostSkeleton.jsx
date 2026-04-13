import React from 'react'
import { Skeleton } from '@heroui/react'

export default function PostSkeleton() {
  return (
    <article className="mb-6 break-inside p-6 rounded-2xl bg-white shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col overflow-hidden">
      <div className="flex pb-4 items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </div>
        </div>
      </div>
      <Skeleton className="h-4 w-full rounded-lg mt-2 mb-4" />
      <div className="pb-4">
        <Skeleton className="w-full h-64 rounded-2xl" />
      </div>
    </article>
  )
}
