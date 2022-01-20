export default function getClassColor (vote_avgr: number) {
  if (vote_avgr < 6) return 'bg-red-500'
  if (vote_avgr <= 8) return 'bg-yellow-500'
  return 'bg-green-500'
}