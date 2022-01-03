import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import React from "react"

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const PostedAt = ({ date }: {date: string}) => {
  const publishedDate = dayjs(date).utcOffset(dayjs().utcOffset())
  const printedDate = publishedDate.format("LLL")
  const fromNow = typeof window === "undefined" ? printedDate : publishedDate.fromNow()

  return (
    <span>
      Posted <time dateTime={date} title={printedDate}>{fromNow}</time>
    </span>
  )
}

export default PostedAt
