# Coach OS Landing Page Brief & Styling Guide

## Project Overview
Create a professional landing page for Coach OS - an AI-first fitness coaching platform that demonstrates the future of personal training through voice interactions, AI-powered insights, and seamless data integration.

**Primary Purpose**: Showcase a voiceover video demonstration and capture pre-registration details from potential coaches interested in the platform.

## Brand Identity & Positioning

**Brand Name**: Coach OS  
**Tagline**: "AI-First Fitness Coaching Platform"  
**Value Proposition**: Transform your fitness coaching with AI-powered program generation, natural voice interactions, and comprehensive client management.

**Target Audience**: Professional fitness coaches, personal trainers, and training studios seeking to modernise their coaching approach with AI technology.

**Tone**: Professional, innovative, premium, B2B-focused. Clean and minimalist without emojis or casual language.

## Visual Design System

### Colour Palette

**Primary Colours**:
- Background: `#0a0a0a` (Deep black)
- Foreground: `#f4f4f5` (Off-white)
- Primary: `#ffffff` (Pure white)
- Primary Foreground: `#0a0a0a` (Black text on white buttons)

**Secondary Colours**:
- Border: `#27272a` (Dark grey borders)
- Input Background: `#18181b` (Dark input fields)
- Muted: `#27272a` (Subtle backgrounds)
- Muted Foreground: `#a1a1aa` (Secondary text)
- Accent: `#18181b` (Subtle accent backgrounds)

**Status Indicators**:
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error/Alert: `#ef4444` (Red)

**Gradient Text** (for headings):
```css
background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Typography

**Primary Font**: Geist Sans (system-ui fallback)  
**Monospace Font**: Geist Mono (for code/technical content)

**Hierarchy**:
- Main Heading: 3xl+ (48px+), bold, gradient text treatment
- Section Headings: 2xl-3xl (32-48px), semi-bold
- Body Text: lg (18px), regular weight
- Secondary Text: sm (14px), muted foreground colour
- Caption/Meta: xs (12px), muted foreground colour

**Font Stack**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Component Patterns

**Cards**:
- Background: `#0a0a0a` (background colour)
- Border: `1px solid #27272a`
- Border Radius: `8px`
- Padding: `24px`
- Hover State: Border colour shifts to `#f4f4f5` (30% opacity)
- Shadow: Subtle professional shadows on hover

**Buttons**:
- Primary: White background, black text, rounded corners
- Secondary: Dark accent background with border
- Hover: Scale transform (1.02x) with smooth transition
- Transition: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`

**Status Indicators**:
- Small coloured dots (2px diameter)
- Badges with coloured backgrounds and appropriate text colours
- Professional styling without emojis

**Navigation**:
- Backdrop blur effect: `backdrop-filter: blur(8px)`
- Semi-transparent background: `bg-background/80`
- Sticky positioning
- Clean horizontal layout

### Animation Guidelines

**Transitions**: Fast and professional (200ms duration)  
**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`  
**Hover Effects**: Subtle scale (1.01-1.02x) and vertical movement (-2px)  
**Page Entrance**: Fade in with slight vertical movement (20px)  
**Stagger Timing**: 100ms delays between card elements  

### Voice Interface Inspiration

**Reference**: Perplexity-style voice interface (see `src/components/PerplexityVoice.tsx`)

**Visual Elements**:
- Large circular animated particle field (500px diameter)
- 300+ small white particles with golden ratio distribution
- Empty centre with particles radiating outward
- Audio-reactive animation with varying opacity and scale
- Smooth transitions between idle/recording/processing states

**Animation States**:
- Idle: Static particles with low opacity (0.2)
- Recording: Animated particles with pulsing motion and audio responsiveness
- Processing: Continuous gentle animation

## Content Strategy

### Landing Page Sections

**Hero Section**:
- Main headline emphasising AI-first coaching
- Subheading about transforming coaching effectiveness
- Prominent video player for the demonstration
- Primary CTA: Pre-registration form

**Product Demonstration**:
- Embedded video showcasing key platform features
- Coach and client perspectives
- Voice interaction examples
- AI insights and recommendations

**Key Features**:
- Natural voice/text interactions
- AI-powered program generation
- Comprehensive data integration
- Proactive coaching insights
- Professional coach dashboard
- Client engagement tools

**Pre-Registration Form**:
- Coach name and email (required)
- Gym/Studio name (optional)
- Current client volume (dropdown)
- Primary coaching focus (checkboxes)
- "Notify me when available" CTA

**Footer**:
- Company information
- Contact details
- Privacy policy link
- Terms of service link

### Messaging Framework

**Primary Headlines**:
- "Coach at the Speed of Thought"
- "AI-First Fitness Coaching Platform"
- "Transform Your Coaching with Natural AI Interactions"

**Key Benefits** (UK English):
- Reduce administrative overhead by 70%
- Generate personalised programmes through voice commands
- Proactive insights from integrated client data
- Professional dashboard for client management
- Natural voice interactions for effortless tracking

**Feature Descriptions**:
- **Voice-First Design**: Natural conversation instead of form filling
- **AI Programme Builder**: Describe adjustments and watch AI implement them
- **Smart Insights**: Pattern detection across multiple data sources
- **Client Engagement**: Simple interfaces that clients actually use
- **Data Integration**: Connect existing tools and wearables seamlessly

## Technical Specifications

**Framework**: Next.js 15+ with TypeScript  
**Styling**: Tailwind CSS with custom CSS variables  
**Package Manager**: pnpm  
**Deployment**: Vercel  

**Dependencies**:
- Framer Motion (for animations)
- Heroicons (for iconography)
- React Hook Form (for form handling)
- Tailwind CSS (for styling)

### CSS Variables Implementation
```css
:root {
  --background: #0a0a0a;
  --foreground: #f4f4f5;
  --border: #27272a;
  --input: #18181b;
  --primary: #ffffff;
  --primary-foreground: #0a0a0a;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #18181b;
  --accent-foreground: #f4f4f5;
  --success: #10b981;
  --warning: #f59e0b;
  --destructive: #ef4444;
}
```

## Mobile Responsiveness

**Breakpoints**:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

**Mobile-First Design**:
- Stack elements vertically on mobile
- Larger touch targets (minimum 44px)
- Readable font sizes (minimum 16px)
- Optimised video player for mobile viewing
- Simplified navigation for touch interfaces

## Form Requirements

**Pre-Registration Fields**:
1. **Coach Name** (required, text input)
2. **Email Address** (required, email validation)
3. **Gym/Studio Name** (optional, text input)
4. **Current Client Volume** (required, dropdown: "1-10", "11-25", "26-50", "50+")
5. **Primary Coaching Focus** (required, multi-select checkboxes):
   - Weight Loss
   - Strength Training
   - Athletic Performance
   - Rehabilitation
   - General Fitness
   - Nutrition Coaching

**Form Styling**:
- Dark input backgrounds (`#18181b`)
- White text with proper contrast
- Rounded corners (6px)
- Border on focus state
- Validation messages in warning colour
- Submit button matches primary button styling

## Performance Requirements

**Loading Speed**: Sub-2 second initial page load  
**Video Optimisation**: Multiple formats (MP4, WebM) with appropriate compression  
**Image Optimisation**: WebP format with fallbacks  
**Animations**: Hardware-accelerated transforms only  
**Accessibility**: WCAG 2.1 AA compliance  

## Success Metrics

**Primary Goals**:
- High-quality pre-registrations from professional coaches
- Video engagement (watch completion rates)
- Form completion rates
- Professional presentation quality suitable for B2B sales

**Secondary Goals**:
- Mobile compatibility and engagement
- Fast loading times across devices
- Accessible design for all users
- SEO optimisation for coaching-related keywords

## Development Notes

- Maintain UK English throughout content (colour, optimise, etc.)
- No emoji usage - keep professional B2B aesthetic
- Implement proper error states for form validation
- Include loading states for video and form submission
- Add proper meta tags for social sharing
- Implement analytics tracking for user interactions

This brief provides comprehensive guidance for creating a professional, conversion-focused landing page that accurately represents the Coach OS brand and effectively captures qualified leads from the target coaching audience.