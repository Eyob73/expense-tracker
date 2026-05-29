Simple Expense Tracker

This is a minimal client-side expense tracker added to `app/page.tsx`.

Features:

- Add expenses with: Amount, Reason, Payment Method/Bank, Category, Date
- Expenses are saved in localStorage (key: `expenses_v1`)
- Table shows expenses with row colors based on amount:
  - green: <= 500
  - yellow: <= 1000
  - light red: > 1000
  - red: > 5000

Run locally:

```powershell
cd C:\Users\sata\Desktop\project\expense\expense-tracker
npm install
npm run dev
# open http://localhost:3000 in your browser
```

Notes:

- This uses Tailwind utility classes; the project already includes Tailwind.
- To reset stored expenses, clear the browser localStorage or remove the `expenses_v1` key.
