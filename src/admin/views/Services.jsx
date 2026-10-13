import { RotateCcw, Globe } from 'lucide-react'
import { fmtDuration, peso } from '../../demo/data'
import { Panel, Button, inputCls } from '../ui'

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-[22px] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47840] ${checked ? 'bg-[#C47840]' : 'bg-[#33332f]'}`}
    >
      <span className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-[18px]' : ''}`} />
    </button>
  )
}

export default function Services({ state, actions }) {
  const groups = []
  for (const s of state.services) {
    let g = groups.find((x) => x.name === s.category)
    if (!g) groups.push((g = { name: s.category, items: [] }))
    g.items.push(s)
  }
  const edited = state.services.filter((s) => s.price !== s.base.price || s.duration !== s.base.duration || !s.online).length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-4">
        <p className="text-[0.88rem] text-[#9d9d95] max-w-[620px] leading-relaxed">
          Change a price, a duration or hide a service here. In the live platform the website, the booking form and the assistant all update the moment you save, with no developer involved.
        </p>
        <div className="ml-auto flex items-center gap-3">
          {edited > 0 && <span className="text-[0.8rem] text-[#C47840]">{edited} {edited === 1 ? 'change' : 'changes'} in this session</span>}
          <Button size="sm" onClick={actions.resetServices} disabled={!edited}><RotateCcw size={13} /> Reset to current menu</Button>
        </div>
      </div>

      {groups.map((g) => (
        <Panel key={g.name} title={g.name} pad={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.84rem] min-w-[640px]">
              <thead>
                <tr className="text-left text-[#77756f] text-[0.76rem]">
                  <th className="font-normal px-5 py-2.5">Service</th>
                  <th className="font-normal px-3 py-2.5 w-[130px]">Duration (min)</th>
                  <th className="font-normal px-3 py-2.5 w-[140px]">Price (PHP)</th>
                  <th className="font-normal px-5 py-2.5 w-[130px] text-right">Online booking</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((s) => {
                  const changed = s.price !== s.base.price || s.duration !== s.base.duration
                  return (
                    <tr key={s.id} className="border-t border-[#1d1d1c]">
                      <td className="px-5 py-3">
                        <div className="font-medium flex items-center gap-2">
                          {s.name}
                          {changed && <span className="text-[0.68rem] text-[#C47840] bg-[#C47840]/15 rounded px-1.5 py-0.5">Edited</span>}
                        </div>
                        <div className="text-[0.74rem] text-[#77756f]">{fmtDuration(s.duration)} appointment, shown to clients as {peso(s.price)}</div>
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="number" min="15" step="5" inputMode="numeric"
                          className={`${inputCls} font-grotesk`}
                          value={s.duration}
                          aria-label={`${s.name} duration in minutes`}
                          onChange={(e) => actions.updateService(s.id, { duration: Math.max(0, Number(e.target.value) || 0) })}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="number" min="0" step="50" inputMode="numeric"
                          className={`${inputCls} font-grotesk`}
                          value={s.price}
                          aria-label={`${s.name} price in pesos`}
                          onChange={(e) => actions.updateService(s.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2.5">
                          <span className={`inline-flex items-center gap-1 text-[0.74rem] ${s.online ? 'text-[#8FC19C]' : 'text-[#77756f]'}`}>
                            <Globe size={12} aria-hidden="true" /> {s.online ? 'Live' : 'Hidden'}
                          </span>
                          <Switch checked={s.online} onChange={(v) => actions.updateService(s.id, { online: v })} label={`Show ${s.name} for online booking`} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      ))}
    </div>
  )
}
