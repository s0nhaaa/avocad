import { database } from "@/services/firebase"
import { Leaderboard } from "@/types/leaderboard"
import { onValue, ref } from "firebase/database"
import { reverse, sortBy } from "lodash-es"
import { useEffect, useState } from "react"

const MEDAL_MAP: Record<string, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
  4: "",
  5: "",
}

export default function Ranking() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>()

  useEffect(() => {
    onValue(ref(database, "leaderboard"), (snapshot) => {
      setLeaderboard(reverse(sortBy<Leaderboard>(snapshot.val(), ["score"])))
    })
  }, [])

  return (
    <div className="absolute top-6 right-6 bg-base-100 p-4 rounded-2xl flex gap-2 w-[300px] h-[350px] flex-col">
      <div className="w-full flex justify-center">
        <span className="font-bold text-warning">✨ Top GUAC ✨</span>
      </div>
      <div className="h-full overflow-x-auto">
        {leaderboard && (
          <table className="table table-zebra">
            <tbody>
              {leaderboard.map((lb, index) => (
                <tr key={lb.address}>
                  <td className="text-3xl text-center">{MEDAL_MAP[index + 1]}</td>
                  <th className="text-primary-content">{lb.username}</th>
                  <td className="text-center">
                    <div className="badge badge-neutral">{lb.score}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
