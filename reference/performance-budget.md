# Performance Budget

This document defines the performance budget for the Grounded Systems documentation site. A performance budget sets limits on key metrics to ensure the site remains fast and responsive.

## Core Metrics Budget

| Metric | Target | Limit | Description |
|--------|--------|-------|-------------|
| First Contentful Paint (FCP) | < 1.8s | 2.5s | Time until the browser renders the first piece of content |
| Largest Contentful Paint (LCP) | < 2.5s | 4.0s | Time until the browser renders the largest content element |
| First Input Delay (FID) | < 100ms | 300ms | Time from when a user first interacts with the page to when the browser responds |
| Cumulative Layout Shift (CLS) | < 0.1 | 0.25 | Measures the visual stability of the page |
| Time to Interactive (TTI) | < 3.8s | 5.0s | Time until the page is fully interactive |
| Total Blocking Time (TBT) | < 200ms | 600ms | Sum of blocking time periods between FCP and TTI |

## Resource Budgets

### Bundle Size Limits
| Resource Type | Target | Limit |
|---------------|--------|-------|
| Total JavaScript | < 150 KB | 200 KB |
| Total CSS | < 50 KB | 75 KB |
| Total Fonts | < 75 KB | 100 KB |
| Total Images | < 250 KB | 500 KB |

### Network Requests
| Metric | Target | Limit |
|--------|--------|-------|
| Total Requests | < 25 | 40 |
| Third-party Requests | < 10 | 15 |

## Device Targets

### Connection Speeds
- **Fast 3G**: 100ms RTT, 1.6 Mbps down
- **Slow 4G**: 150ms RTT, 0.4 Mbps down

### Device Classes
- **High-end mobile**: Latest iPhone/Android with good connection
- **Mid-range mobile**: Mid-tier device with average connection
- **Desktop**: Modern browser on desktop computer

## Measurement & Monitoring

### Automated Testing
- Lighthouse CI integration for pull requests
- WebPageTest runs on deployment
- Synthetic monitoring with real browsers

### Alerts
- Budget violations trigger notifications in Slack
- Performance regressions >10% block deployments
- Monthly performance reports to team

## Enforcement

### Build Process
- Webpack Bundle Analyzer integrated into build pipeline
- Size-limit tool enforces JavaScript budgets
- CSSNano optimizations enforced

### Deployment Gate
- Performance tests must pass before merging to main
- Regressions >15% require explicit override approval