import { ArrowLeft, ArrowRight, Users, CalendarHeart } from 'lucide-react'
import { WEDDING_STAGES, addDays, startOfDay, fmtDay, peso } from '../../demo/data'
import { Button } from '../ui'

export default function Weddings({ state, now, actions }) {
  const today = startOfDay(now)
  const open = state.enquiries.filter((e) => e.stage !== 'done')
  const pipeline = open.reduce((s, e) => s + e.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-x-10 gap-y-3">
        <p className="text-[0.88rem] text-[#9d9d95] max-w-[560px] leading-relaxed">
          Wedding and entourage bookings are your largest tickets. Every enquiry from the website lands here as a card instead of an email, so none get lost.
        </p>
        <div className="ml-auto flex gap-8">
          <div>
            <div className="text-[0.76rem] text-[#77756f]">Open enquiries</div>
            <div className="font-grotesk font-bold text-[1.5rem]">{open.length}</div>
          </div>
          <div>
            <div className="text-[0.76rem] text-[#77756f]">In the pipeline</div>
            <div className="font-grotesk font-bold text-[1.5rem] text-[#C47840]">{peso(pipeline)}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-cols-5 gap-4 min-w-[1120px]">
          {WEDDING_STAGES.map((stage, si) => {
            const cards = state.enquiries.filter((e) => e.stage === stage.id)
            return (
              <section key={stage.id} aria-label={stage.label} className="bg-[#0d0d0c] border border-[#222220] rounded-lg p-3 min-h-[320px]">
                <header className="px-1.5 pb-3">
                  <h3 className="font-grotesk font-semibold text-[0.9rem]">{stage.label}</h3>
                  <p className="text-[0.74rem] text-[#77756f] mt-0.5">{cards.length} {cards.length === 1 ? 'couple' : 'couples'}, {peso(cards.reduce((s, c) => s + c.value, 0))}</p>
                </header>
                <ul className="space-y-3">
                  {cards.map((c) => {
                    const date = addDays(today, c.inDays)
                    return (
                      <li key={c.id} className="bg-[#161615] border border-[#2a2a28] rounded-md p-3.5">
                        <div className="font-grotesk font-semibold text-[0.95rem]">{c.name}</div>
                        <div className="flex items-start gap-1.5 text-[0.76rem] text-[#9d9d95] mt-1.5">
                          <CalendarHeart size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                          <span>
                            {fmtDay(date, { month: 'short', day: 'numeric', year: 'numeric' })}
                            <span className="block text-[#77756f]">{c.inDays >= 0 ? `In ${c.inDays} days` : `${-c.inDays} days ago`}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[0.76rem] text-[#9d9d95] mt-1">
                          <Users size={12} aria-hidden="true" /> {c.party} in the party
                        </div>
                        <div className="mt-2.5 text-[0.8rem]">{c.pkg}</div>
                        <div className="font-grotesk text-[#C47840] text-[0.9rem] mt-0.5">{peso(c.value)}</div>
                        <p className="text-[0.76rem] text-[#77756f] leading-snug mt-2">{c.note}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" disabled={si === 0} onClick={() => actions.moveEnquiry(c.id, -1)} aria-label={`Move ${c.name} back to ${WEDDING_STAGES[si - 1]?.label}`}>
                            <ArrowLeft size={13} />
                          </Button>
                          <Button size="sm" variant={si < WEDDING_STAGES.length - 1 ? 'primary' : 'ghost'} disabled={si === WEDDING_STAGES.length - 1} onClick={() => actions.moveEnquiry(c.id, 1)}>
                            {WEDDING_STAGES[si + 1] ? WEDDING_STAGES[si + 1].label : 'Finished'}
                            {WEDDING_STAGES[si + 1] && <ArrowRight size={13} />}
                          </Button>
                        </div>
                      </li>
                    )
                  })}
                  {cards.length === 0 && <li className="text-[0.78rem] text-[#5f5d57] px-1.5 py-4">Nothing at this stage.</li>}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
