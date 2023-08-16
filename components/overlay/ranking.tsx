export default function Ranking() {
  return (
    <div className="absolute top-6 right-6 bg-base-100 p-4 rounded-2xl flex gap-2 w-[250px] h-[320px] flex-col">
      <div className="w-full flex justify-center">
        <span className="font-bold text-warning">✨ Top Chef ✨</span>
      </div>
      <div className="h-full overflow-x-auto">
        <table className="table table-zebra">
          <tbody>
            <tr>
              <td className="text-2xl">🥇</td>
              <th>1234324</th>
              <td>
                <div className="badge badge-neutral">12</div>
              </td>
            </tr>
            <tr>
              <td className="text-xl">🥈</td>
              <th>1234324</th>
              <td>
                <div className="badge badge-neutral">12</div>
              </td>
            </tr>
            <tr>
              <td className="text-lg">🥉</td>
              <th>1234324</th>
              <td>
                <div className="badge badge-neutral">12</div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <th>1234324</th>
              <td>
                <div className="badge badge-neutral">12</div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <th>1234324</th>
              <td>
                <div className="badge badge-neutral">12</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
