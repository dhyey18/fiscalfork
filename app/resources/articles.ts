import type { PhotoKey } from "../lib/images";

/**
 * One body block in an article. Kept deliberately small (paragraph, heading,
 * bullet list, callout) rather than reaching for a markdown/MDX pipeline —
 * there are seven pieces, hand-authored, and every other page on this site
 * already renders hand-written data arrays into JSX. Adding a markdown
 * dependency for seven short guides would be more machinery than content.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  cat: string;
  time: string;
  title: string;
  desc: string;
  photo: PhotoKey;
  body: Block[];
};

/**
 * Tax and entity-structure content is written in general, jurisdiction-neutral
 * terms (no IRS/CRA forms, no country-specific entity names like "LLC") to
 * match the rest of the site, which dropped country-specific framing
 * deliberately — see the "remove US/Canada" change elsewhere in this repo's
 * history. "Sole trader / partnership / limited company" reads as a real
 * category in most jurisdictions without claiming to be any one country's law.
 */
export const ARTICLES: Article[] = [
  {
    slug: "quarterly-estimated-taxes",
    cat: "Tax",
    time: "6 min read",
    title: "Quarterly estimated taxes: a simple calendar for owners",
    desc: "When to pay, how much to set aside, and how to avoid underpayment penalties.",
    photo: "article-1",
    body: [
      {
        type: "p",
        text: "Most tax authorities expect businesses and their owners to pay tax as income is earned, not in one lump sum the following year. For a business with steady profit, that usually means an estimated payment four times a year rather than one annual bill. Missing a payment, or underpaying by too much, typically triggers an interest charge on top of the tax itself — not a one-off penalty, but a running cost for every day the payment was short.",
      },
      {
        type: "h2",
        text: "Work out what to set aside, not what to pay",
      },
      {
        type: "p",
        text: "The easier version of this problem isn't predicting your exact quarterly bill — it's setting aside a fixed percentage of profit as it comes in, so the quarterly payment is never a surprise. Most owners land somewhere between a quarter and a third of profit, depending on their structure and local rates. The number matters less than the habit: move it to a separate account on the same day you review your monthly numbers, before it has a chance to look like spare cash.",
      },
      {
        type: "callout",
        text: "If last year was unusually strong or unusually weak, don't anchor this year's set-aside to last year's number. Base it on this year's actual run rate, reviewed monthly.",
      },
      {
        type: "h2",
        text: "Build the calendar around your close, not the other way round",
      },
      {
        type: "p",
        text: "Estimated payments are easiest when they sit on the same calendar as your monthly close. If your books are closed and reconciled by a fixed date each month, you already know your year-to-date profit by the time a quarterly payment is due — there's no scramble to reconstruct three months of transactions right before a deadline.",
      },
      {
        type: "list",
        items: [
          "Set aside the percentage on the same day every month, not just near a deadline",
          "Review year-to-date profit against your estimate at each close",
          "Confirm the exact due dates for your jurisdiction and put them on a shared calendar, not a sticky note",
          "Adjust the running set-aside if a quarter is materially ahead of or behind plan",
        ],
      },
      {
        type: "h2",
        text: "What actually causes an underpayment penalty",
      },
      {
        type: "p",
        text: "In most systems, the penalty isn't really about getting the number exactly right — it's about paying roughly in line with either your current year's income or your prior year's bill, whichever your local rules use as the safe harbour. A good bookkeeping-driven estimate, reviewed each month, keeps you inside that range without needing to predict the future with any precision.",
      },
      {
        type: "p",
        text: "If this already sounds like more process than you have time for, that's the part we take off your plate — the monthly close, the running estimate, and the reminder before each payment is due.",
      },
    ],
  },
  {
    slug: "monthly-close-checklist",
    cat: "Bookkeeping",
    time: "5 min read",
    title: "The monthly close checklist we use for every client",
    desc: "Twelve steps that turn a pile of transactions into numbers you can trust.",
    photo: "article-2",
    body: [
      {
        type: "p",
        text: "A monthly close is the process that turns raw bank activity into a set of numbers you can actually make a decision from. Skip steps, and the P&L technically balances but quietly lies to you — a missed bill shows up as profit, an unreconciled account hides a shortfall. The checklist below is the one we run against every client's books, every month, in the same order.",
      },
      {
        type: "h2",
        text: "Before you can close anything",
      },
      {
        type: "list",
        items: [
          "Every bank and card account reconciled to its statement, to the cent",
          "Every transaction categorised — nothing left sitting in a catch-all or \"ask later\" account",
          "Outstanding invoices and bills matched against what's actually been received or paid",
          "Payroll for the period recorded, including any accruals for days worked but not yet paid",
        ],
      },
      {
        type: "h2",
        text: "The adjustments most books skip",
      },
      {
        type: "p",
        text: "This is where a close turns from \"the bank account matches\" into \"the P&L is actually true.\" It's also the part that gets skipped under time pressure, because none of it shows up as an obvious error — the books still balance, they're just wrong.",
      },
      {
        type: "list",
        items: [
          "Prepaid expenses spread across the months they actually cover, not expensed on the day they were paid",
          "Depreciation recorded for the period",
          "Inventory or cost of goods adjusted to what was actually used or sold, not just purchased",
          "Accrued expenses for anything owed but not yet billed",
        ],
      },
      {
        type: "callout",
        text: "If your P&L moves by a large amount for no operational reason you can explain in one sentence, that's a sign an adjustment was missed — not a sign business got better or worse.",
      },
      {
        type: "h2",
        text: "Review before you call it closed",
      },
      {
        type: "list",
        items: [
          "Compare this month's result to last month and to the same month last year — explain anything that moved more than you'd expect",
          "Check the balance sheet, not just the P&L; a clean P&L sitting on a messy balance sheet is usually hiding something",
          "Confirm cash in the bank matches cash on the books, exactly",
          "Lock the period once it's reviewed, so nothing is edited into a month that's already been reported on",
        ],
      },
      {
        type: "p",
        text: "Twelve steps, run in the same order, every month, is what makes a close something you can set your clock by rather than something that happens whenever there's time. That consistency — not any single step on the list — is what actually makes the numbers trustworthy.",
      },
    ],
  },
  {
    slug: "why-profitable-businesses-run-out-of-cash",
    cat: "Cash flow",
    time: "7 min read",
    title: "Why profitable businesses still run out of cash",
    desc: "The four most common causes, and what to change in each case.",
    photo: "article-3",
    body: [
      {
        type: "p",
        text: "Profit is an opinion; cash is a fact. A business can show a healthy profit on its P&L and still not have enough money in the bank to make payroll — and the gap between those two numbers is almost always one of four things. None of them are exotic, and all of them show up clearly once you're looking at the right report.",
      },
      {
        type: "h2",
        text: "1. Growth is eating the cash it generates",
      },
      {
        type: "p",
        text: "A growing business usually has to pay for inventory, materials or labour before the matching revenue lands in the bank. The faster you grow, the bigger that gap gets, even though every month looks more profitable than the last. This is the single most common cause of a profitable business running tight on cash, and it's the one owners are most surprised by — it feels like something should be wrong, but growth itself is the explanation.",
      },
      {
        type: "h2",
        text: "2. Customers are paying slower than suppliers",
      },
      {
        type: "p",
        text: "If your receivables take forty-five days to collect and your payables are due in fifteen, you are financing that thirty-day gap out of your own cash, every single cycle. It's invisible on a P&L because both sides are recorded as of the date of the invoice, not the date of the payment — the cash impact only shows up on a cash flow statement, which is exactly why relying on the P&L alone hides it.",
      },
      {
        type: "list",
        items: [
          "Compare your average days to collect against your average days to pay",
          "Tighten payment terms on new contracts before the gap gets structurally worse",
          "Chase overdue invoices on a fixed weekly schedule, not only when cash gets tight",
        ],
      },
      {
        type: "h2",
        text: "3. One-time items are hitting cash but not profit",
      },
      {
        type: "p",
        text: "A loan repayment, an owner's draw, a large equipment purchase paid upfront — none of these show up as an expense on the P&L in the month they drain your cash. They're real, they're often necessary, and they're also completely invisible if the P&L is the only report you look at.",
      },
      {
        type: "h2",
        text: "4. There's no forward view of cash at all",
      },
      {
        type: "p",
        text: "The deepest version of this problem isn't any single cause — it's finding out about a shortfall the week it happens instead of six weeks before. A rolling cash forecast turns a crisis into a known, plannable event: a dip you saw coming and arranged for, instead of a surprise that forces a scramble.",
      },
      {
        type: "callout",
        text: "If you only read one number each month, make it cash in the bank today against cash in the bank the same day last month — not the P&L's bottom line.",
      },
      {
        type: "p",
        text: "We cover a practical way to build that forward view in our guide on building a 13-week cash forecast — it's the single highest-leverage habit most owners haven't picked up yet.",
      },
    ],
  },
  {
    slug: "burn-runway-and-investor-metrics",
    cat: "Startups",
    time: "8 min read",
    title: "Burn, runway and the metrics investors ask about first",
    desc: "How to calculate them correctly and present them in a board update.",
    photo: "article-4",
    body: [
      {
        type: "p",
        text: "If you're raising, or reporting to a board, three numbers get asked about before anything else: burn, runway, and the trend underneath them. Get the definition slightly wrong and an investor will notice immediately, because they've seen the same three numbers calculated a hundred different ways — most of them flattering, and most of them wrong.",
      },
      {
        type: "h2",
        text: "Gross burn versus net burn",
      },
      {
        type: "p",
        text: "Gross burn is simply what you spent in the month. Net burn is what you spent minus what you brought in — and it's net burn that actually determines how fast your cash is depleting. A business with rising revenue can have falling net burn even while gross spending goes up, and that distinction is exactly what a sophisticated investor is checking for.",
      },
      {
        type: "h2",
        text: "Runway is a forecast, not a snapshot",
      },
      {
        type: "p",
        text: "The common mistake is calculating runway as cash in the bank divided by last month's burn, and presenting that single number as though it were fixed. Runway only means something as a forward-looking forecast — if burn is trending up or down, the flat calculation is already wrong by the time you present it.",
      },
      {
        type: "list",
        items: [
          "Use a 3-month rolling average of net burn, not a single month, to smooth out one-off spikes",
          "Re-forecast monthly, not quarterly — runway changes faster than most founders update it",
          "Show the trend line, not just the current figure; a board wants to see where burn is heading, not only where it sits today",
        ],
      },
      {
        type: "h2",
        text: "What a credible board update actually contains",
      },
      {
        type: "p",
        text: "The founders who get the easiest board meetings aren't the ones with the best numbers — they're the ones whose numbers never have to be re-explained or corrected mid-meeting. That comes from presenting the same four or five metrics, calculated the same way, every single month.",
      },
      {
        type: "list",
        items: [
          "Net burn for the month and the trailing three-month average",
          "Runway at current burn, and runway at a reasonably conservative higher-burn scenario",
          "Cash in the bank, as of the date of the update — not the date the deck was started",
          "Any one-time items that distorted the month, called out explicitly rather than left for someone to notice",
        ],
      },
      {
        type: "callout",
        text: "If a number moved and you can't explain why in one sentence, don't present it until you can. An unexplained swing costs more credibility than a late deck.",
      },
      {
        type: "p",
        text: "None of this requires elaborate modelling — it requires the same monthly discipline a good close already gives you, applied consistently enough that your board update is a formality rather than a fire drill.",
      },
    ],
  },
  {
    slug: "catching-up-late-books",
    cat: "Bookkeeping",
    time: "4 min read",
    title: "Catching up on months of late books: where to start",
    desc: "A realistic order of operations for getting current without losing a quarter.",
    photo: "article-5",
    body: [
      {
        type: "p",
        text: "Books that have slipped three, six, or twelve months behind feel like an enormous problem because they're usually approached as one. Broken into the right order, a catch-up is a finite, mechanical project — not a mystery, and not a reason to keep putting it off another month.",
      },
      {
        type: "h2",
        text: "Start with the bank, not the categorisation",
      },
      {
        type: "p",
        text: "The instinct is to start sorting every transaction into the right category. Don't — start by pulling every bank and card statement for the whole period and reconciling the accounts first. Until every account ties out to its statement, you don't actually know whether anything else you do is correct, so categorisation before reconciliation is often wasted effort.",
      },
      {
        type: "h2",
        text: "Work backwards from the most recent month",
      },
      {
        type: "p",
        text: "It feels more natural to start at the oldest unreconciled month and work forward, but the most recent month is the one you need current fastest — it's what any decision you make this week will be based on. Close the most recent month first, then work backwards through the gap. You get a usable, current P&L almost immediately, with the historical clean-up running in parallel behind it.",
      },
      {
        type: "list",
        items: [
          "Reconcile every account across the full gap before categorising anything",
          "Close the most recent month first, so you have current numbers to work from immediately",
          "Work backwards through the remaining months in order",
          "Flag anything genuinely ambiguous rather than guessing — a short list of questions is faster to resolve than books that look done but aren't",
        ],
      },
      {
        type: "callout",
        text: "A twelve-month gap is not twelve times harder than a one-month gap — the bank reconciliation and categorisation rules barely change month to month. It's a longer project, not a harder one.",
      },
      {
        type: "h2",
        text: "Decide what \"caught up\" needs to mean",
      },
      {
        type: "p",
        text: "Catching up for your own decision-making is a lower bar than catching up for a lender, an investor, or a tax filing. Know which one you actually need before you start, so you're not redoing the same months to a higher standard halfway through.",
      },
      {
        type: "p",
        text: "If the gap feels too large to start, that's usually a sign to hand the reconciliation step to someone else rather than a sign the business is in worse shape than it looks — the two are rarely the same thing.",
      },
    ],
  },
  {
    slug: "choosing-a-business-entity",
    cat: "Tax",
    time: "6 min read",
    title: "Choosing a business entity: what changes for your taxes",
    desc: "A plain comparison of the common structures and when switching makes sense.",
    photo: "article-6",
    body: [
      {
        type: "p",
        text: "Most jurisdictions offer some version of the same three structures: operating as an individual (a sole trader), a partnership between owners, and a separate limited company. The exact legal names and rules differ by country, but the trade-offs between them are the same everywhere, and they're what actually determines whether switching is worth it.",
      },
      {
        type: "h2",
        text: "Liability is the first question, tax is the second",
      },
      {
        type: "p",
        text: "A sole trader or simple partnership is the business, legally — there's no separation between business debts and personal assets. A limited company creates that separation, at the cost of more formal record-keeping and reporting. For most owners, the liability question gets decided first, on its own terms, and the tax question gets decided second, within whatever structure that leaves.",
      },
      {
        type: "h2",
        text: "How profit actually gets taxed differs by structure",
      },
      {
        type: "p",
        text: "As a sole trader or partner, profit is typically taxed in your hands as personal income, whether or not you actually withdrew it from the business. In a limited company structure, the company is usually taxed separately, and you're taxed again only on what you actually draw out as salary or dividends — which is where most of the real tax planning in a limited structure happens.",
      },
      {
        type: "list",
        items: [
          "Sole trader / simple partnership: profit taxed as personal income, whether or not it's withdrawn",
          "Limited company: profit taxed at the company level; owner taxed again only on what's actually drawn out",
          "The second structure usually adds reporting requirements the first doesn't have",
        ],
      },
      {
        type: "callout",
        text: "Switching structure has a cost — new registrations, new accounts, sometimes a change in how contracts are held. It's worth doing when the numbers clearly justify it, not as a reflexive upgrade once a business starts growing.",
      },
      {
        type: "h2",
        text: "When it's actually worth revisiting",
      },
      {
        type: "list",
        items: [
          "Profit has grown to the point where leaving money in the business, rather than drawing it all out, would genuinely lower the current year's tax",
          "You're taking on a partner, investor, or significant new liability exposure",
          "A customer, lender, or landlord requires a specific structure as a condition of doing business",
        ],
      },
      {
        type: "p",
        text: "This is one decision worth making with your numbers actually in front of you, rather than on general advice — what's right depends on your real profit, your real liability exposure, and your local rules, together.",
      },
    ],
  },
];

export const FEATURED: Article = {
  slug: "13-week-cash-forecast",
  cat: "Cash flow",
  time: "9 min read",
  title: "How to build a 13-week cash forecast in an afternoon",
  desc: "A step-by-step method to see cash shortfalls weeks before they happen, with a free template.",
  photo: "resource-featured",
  body: [
    {
      type: "p",
      text: "A 13-week cash forecast answers one question clearly: will there be enough cash in the bank on the days bills actually come due? It's short enough to be accurate — you can genuinely see most of what's coming in the next three months — and long enough to give you real warning before a shortfall arrives, instead of finding out the week it happens.",
    },
    {
      type: "h2",
      text: "Why thirteen weeks, specifically",
      },
    {
      type: "p",
      text: "Thirteen weeks is one quarter, which maps naturally onto most billing and payroll cycles — most of what will hit your account in that window is already either invoiced, scheduled, or predictable from a recent pattern. Go much further out and you're mostly guessing; stay much shorter and you lose the lead time that makes the forecast useful in the first place.",
    },
    {
      type: "h2",
      text: "Step 1: Start with the cash you actually have",
    },
    {
      type: "p",
      text: "Open the forecast with today's real, reconciled bank balance — not a budgeted number, not what the P&L implies you should have. Every week that follows builds on this one real figure, so it has to be right before anything else is.",
    },
    {
      type: "h2",
      text: "Step 2: List what's coming in, week by week",
    },
    {
      type: "p",
      text: "Go through outstanding invoices and any other known incoming payments, and place each one in the week you realistically expect it to land — not the week it's due, if your customers reliably pay late. For recurring revenue, use your actual recent collection pattern rather than the contracted terms.",
    },
    {
      type: "h2",
      text: "Step 3: List what's going out, week by week",
    },
    {
      type: "list",
      items: [
        "Payroll, on its actual pay dates",
        "Rent and other fixed costs, on their actual due dates",
        "Supplier payments, placed in the week you actually intend to pay them",
        "Loan payments, tax instalments and anything else on a fixed schedule",
      ],
    },
    {
      type: "h2",
      text: "Step 4: Roll the balance forward",
    },
    {
      type: "p",
      text: "Each week's ending balance becomes next week's starting balance. Once that's rolled all the way across thirteen weeks, any week where the balance would run negative is visible immediately — not as a surprise six weeks from now, but as a line you can see today.",
    },
    {
      type: "callout",
      text: "The forecast's job is to show you the problem early, not to be perfectly accurate. A rough forecast reviewed weekly beats a precise one built once and never updated.",
    },
    {
      type: "h2",
      text: "Keep it alive, or it stops being useful",
    },
    {
      type: "p",
      text: "A forecast built once and left alone goes stale within a few weeks. Update it on the same day each week — replace this week's estimate with what actually happened, and extend the far end by one more week, so it's always rolling thirteen weeks ahead rather than counting down to a fixed date.",
    },
    {
      type: "p",
      text: "This is the single habit that turns cash flow from something that happens to a business into something the business can see coming. If you'd rather have it built and maintained for you, that's exactly the kind of reporting we run for clients on a fixed monthly calendar.",
    },
  ],
};

export function findArticle(slug: string): Article | undefined {
  return slug === FEATURED.slug
    ? FEATURED
    : ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(current: Article, count = 3): Article[] {
  const pool = ARTICLES.filter((a) => a.slug !== current.slug);
  const sameCat = pool.filter((a) => a.cat === current.cat);
  const rest = pool.filter((a) => a.cat !== current.cat);
  return [...sameCat, ...rest].slice(0, count);
}
