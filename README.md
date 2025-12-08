# Transactions Dashboard

A modern, feature-rich financial transactions dashboard built with React and TypeScript. This application provides a comprehensive view of wallet balances, transaction history, and financial analytics with advanced filtering and export capabilities.

## Features

### 📊 Dashboard Overview

- **Wallet Balance Display**: View available balance, ledger balance, total payout, total revenue, and pending payout
- **Transaction Trends Chart**: Interactive line chart showing transaction patterns over time
- **Transaction Table**: Comprehensive table displaying all transactions with detailed information

### 🔍 Advanced Filtering

- **Date Range Filtering**: Filter transactions by custom date ranges or predefined periods:
  - Today
  - Last 7 days
  - Last 30 days
  - Last 3 months
  - This year
  - All time
- **Transaction Type Filtering**: Filter by deposit or withdrawal transactions
- **Transaction Status Filtering**: Filter by successful or pending transactions

### 💾 Data Export

- Export filtered transactions to CSV format
- Includes all transaction details: date, type, description, amount, payment reference, and status

### 🎨 User Interface

- Modern, responsive design with Tailwind CSS
- Custom Degular font family
- Loading states with skeleton components
- Accessible components with proper ARIA labels
- Mobile-friendly layout

## Tech Stack

### Core Technologies

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Custom Fonts** - Degular font family

### Data Management

- **TanStack Query (React Query) 5.90.12** - Server state management and data fetching
- **Axios 1.13.2** - HTTP client

### Data Visualization

- **Recharts 3.5.1** - Chart library for React

### Date Handling

- **date-fns 4.1.0** - Date utility library
- **react-datepicker 8.10.0** - Date picker component
- **react-day-picker 9.12.0** - Calendar component

### Icons

- **lucide-react 0.556.0** - Icon library
- **react-icons 5.5.0** - Additional icons
- **SVG Icons** - Custom SVG icons

### Testing

- **Vitest 4.0.15** - Test runner
- **React Testing Library 16.1.0** - Component testing utilities
- **MSW (Mock Service Worker) 2.6.4** - API mocking for tests
- **@vitest/coverage-v8** - Code coverage

### Development Tools

- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
transactions-dashboard/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/         # React components (Atomic Design)
│   │   ├── atoms/         # Basic building blocks (Select, Skeleton)
│   │   ├── molecules/     # Composite components (Calendar, DateRangePicker)
│   │   └── organisms/     # Complex components (Navbar, Sidebar, TransactionsTable, ChartSection)
│   ├── layout/            # Layout components
│   ├── lib/               # Third-party library configurations
│   ├── queries/           # React Query hooks
│   ├── test/              # Test utilities and mock data
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── package.json
├── vite.config.ts         # Vite configuration
├── vitest.config.ts       # Vitest configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd transactions-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:run` - Run tests once (CI mode)

## API Integration

The application expects the following API endpoints:

- `GET /user` - Fetch user information
- `GET /wallet` - Fetch wallet data (balance, payouts, revenue)
- `GET /transactions` - Fetch transaction list

### API Response Formats

**User:**

```typescript
{
  first_name: string;
  last_name: string;
  email: string;
}
```

**Wallet:**

```typescript
{
  balance: number;
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
}
```

**Transactions:**

```typescript
Array<{
  amount: number;
  date: string;
  status: "successful" | "pending";
  type: "deposit" | "withdrawal";
  payment_reference?: string;
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
}>;
```

## Testing

The project uses Vitest and React Testing Library for comprehensive testing. Tests are organized alongside components in `__tests__` directories.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests once (for CI)
npm run test:run
```

### Test Structure

- Component tests in `components/**/__tests__/`
- Utility tests in `utils/__tests__/`
- Query tests in `queries/__tests__/`
- Mock data and test utilities in `src/test/`

## Building for Production

```bash
npm run build
```

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
