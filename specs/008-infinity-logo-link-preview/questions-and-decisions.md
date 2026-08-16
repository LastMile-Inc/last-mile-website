# Questions and decisions

| Question | Decision |
| --- | --- |
| Why does Apple Messages show the old architecture? | Production HTML explicitly names `/images/last-mile-og.jpg` as `og:image`. |
| Should a new logo be generated? | No. Reuse the approved `public/logo.png` exactly. |
| Which metadata matters most? | Static Open Graph metadata, because link-preview crawlers may not execute the React application. |
| Should route-level metadata also change? | Yes, so browser-rendered metadata cannot reintroduce the old image. |
| Does this authorize another production deployment? | No. It prepares and validates a correction for the existing workstream. |
