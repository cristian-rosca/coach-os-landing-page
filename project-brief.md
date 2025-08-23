# Coach OS Demo - Enhanced Project Brief

## Project Overview

Build a comprehensive demo prototype for Coach OS that showcases both coach and client perspectives. This is a **demo-only** prototype designed to validate the concept with potential customers using hardcoded data and simulated AI processing.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: Supabase (minimal usage for demo)
- **Styling**: Tailwind CSS
- **AI SDK**: Vercel AI SDK (optional for demo)
- **API**: Gemini API (optional for demo)
- **Deployment**: Vercel

## Design Principles

- **Minimalist and premium**: Clean, dark theme with focus on simplicity (current aesthetic maintained)
- **Fast transitions**: Everything should feel instant
- **Professional**: B2B sales presentation quality
- **Mobile-first**: Especially for client interfaces

## Demo Structure

The app is split into two main sections:
- `/coach/*` - Coach perspective and tools
- `/client/*` - Client perspective and interactions

---

## COACH PERSPECTIVE (`/coach/*`)

### 1. Login Page (`/coach`)

**Keep existing styling, update functionality**:
- Coach OS logo (text)
- Email input (pre-filled with "cristian@coach.com")
- Password input (**pre-filled** so coach can just click sign-in)
- "Sign In" button → redirects to `/coach/dashboard`
- Small text: "Demo Version - Founding Coaches Preview"

### 2. Coach Dashboard (`/coach/dashboard`)

**Enhanced prioritization and clarity**:
- Top nav: "Coach OS" logo, coach name, settings icon (non-functional)
- **Remove**: "Demo Features" section
- **Update**: Client cards ordered by action urgency (highest priority first)
- **Enhanced**: Make action requirements more obvious with clear visual indicators

**Client Card Priority Order**:
1. **Mike Johnson** (Needs Attention - Red/Amber indicator)
   - "No check-in for 3 days"
   - "Weight loss stalled - stress levels high"
   - "Requires follow-up"
2. **Sarah Miller** (Program Adjustment Needed - Yellow indicator)
   - "Knee issue pattern detected"
   - "Program adjustment recommended"
3. **Emma Chen** (On Track - Green indicator)
   - "All goals on track"
   - "Last check-in: 2h ago"

### 3. Enhanced Client Detail Page (`/coach/clients/[id]`)

**Tab Navigation Structure**:
- **Overview** (existing)
- **Goals** (new)
- **Performance** (new)
- **Data Log** (new)
- **Insights** (enhanced existing)
- **Program** (existing)

#### 3.1 Overview Tab
- Client stats and recent activity (existing functionality)
- Quick action buttons for common tasks

#### 3.2 Goals Tab (`/coach/clients/[id]/goals`)

**Goal Categories**:
```
Body Composition
├── Target weekly weight change: -1.5 lbs/week
├── Current trend: -0.8 lbs/week (Behind target)

Nutrition  
├── Daily calories: 1,800 cal
├── Protein: 140g daily
├── Current avg: 1,650 cal, 125g protein (Below target)

Activity
├── Daily steps: 10,000 steps
├── Training sessions: 4x/week
├── Current avg: 8,500 steps, 3.2x/week (Below target)

Recovery
├── Sleep: 7+ hours nightly
├── Current avg: 6.5 hours (Below target)

Habits
├── Take creatine daily: ✓ On track (6/7 days)
├── Rehab work daily: ⚠️ Behind (4/7 days)
```

**Goal Management**:
- Edit existing goals with inline editing
- Add new goals with dropdown categories
- Set target values with appropriate units
- Archive completed goals

#### 3.3 Performance Tab (`/coach/clients/[id]/performance`)

**Timeframe Selector**: Last 7 days | Last 30 days | Last 3 months

**Performance Dashboard**:
```
┌─────────────────────────────────────────┐
│ WEIGHT TREND                      ⚠️    │
│ Target: -1.5 lbs/week                   │
│ Actual: -0.8 lbs/week (47% of target)  │
│ [Mini trend chart]                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ NUTRITION ADHERENCE               ⚠️    │
│ Calories: 92% of target (1,650/1,800)  │
│ Protein: 89% of target (125g/140g)     │
│ [Mini bar chart]                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ACTIVITY COMPLIANCE               ⚠️    │
│ Steps: 85% of target (8,500/10,000)    │
│ Training: 80% frequency (3.2/4x week)  │
│ [Mini activity chart]                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ RECOVERY METRICS                  ❌    │
│ Sleep: 93% of target (6.5h/7h)         │
│ Sleep quality: Good (Oura: 82 avg)     │
│ [Mini sleep chart]                      │
└─────────────────────────────────────────┘
```

**Status Indicators**:
- ✅ On track (90-110% of target)
- ⚠️ Attention needed (70-89% or 111-130% of target)
- ❌ Intervention required (<70% or >130% of target)

#### 3.4 Data Log Tab (`/coach/clients/[id]/data`)

**Data Type Categories** (organized tabs):
- **Body Metrics**: Weight, body fat %, measurements
- **Nutrition**: Calories, macros, meal timing
- **Activity**: Steps, training sessions, cardio
- **Recovery**: Sleep hours, sleep quality, HRV, stress
- **Habits**: Supplement tracking, rehab compliance

**Sample Weight Log**:
```
BODY WEIGHT (Last 30 days)
┌──────────────────────────────────────────┐
│ Week 4: 158.2 lbs (avg) ↓ 0.6 lbs       │
│ Week 3: 158.8 lbs (avg) ↓ 1.2 lbs       │  
│ Week 2: 160.0 lbs (avg) ↓ 1.8 lbs       │
│ Week 1: 161.8 lbs (avg) ↓ 2.1 lbs       │
│                                          │
│ Sources: Voice input (12), Manual (8),   │
│          Scale sync (5)                  │
└──────────────────────────────────────────┘
```

**Data Source Legend**:
- 🎤 Voice Input (Coach OS)
- ✍️ Manual Entry (Coach OS)
- 📱 App Integration (MyFitnessPal, Oura, etc.)
- 💬 WhatsApp Integration

#### 3.5 Enhanced Insights Tab (`/coach/clients/[id]/insights`)

**AI-Generated Insights** (automatically triggered):

```
🚨 INTERVENTION RECOMMENDED
Weight loss has stalled over past 2 weeks despite calorie target adherence. Client reporting increased work stress (3 mentions) and averaging 6.5h sleep vs 7h target. Elevated cortisol may be impacting progress.

Recommended Actions:
• Schedule check-in call to discuss stress management
• Consider implementing diet break (7-14 days at maintenance)
• Review sleep hygiene strategies
• Temporarily reduce training volume if stress continues

Generated: 2 hours ago | Confidence: High
```

```
⚠️ PATTERN DETECTED  
Nutrition adherence drops significantly on weekends (65% vs 95% weekdays). Client mentions social events as primary factor.

Recommended Actions:
• Adjust weekend calorie targets to account for social eating
• Provide flexible meal strategies for social situations
• Consider higher weekday deficit to accommodate weekend variance

Generated: 1 day ago | Confidence: Medium
```

```
✅ POSITIVE TREND
Training consistency improved 40% over past month. Client expressing higher motivation and energy levels in recent check-ins.

Recommended Actions:
• Acknowledge progress in next communication
• Consider progressive overload adjustments
• Maintain current approach

Generated: 3 days ago | Confidence: High
```

**Insight Categories**:
- 🚨 Intervention Recommended (red)
- ⚠️ Pattern Detected (yellow)  
- ✅ Positive Trend (green)
- 📊 Data Correlation (blue)

**Recommended Action Types**:
- Schedule check-in call
- Make adjustment to targets
- Make adjustment to training program
- Implement diet break/deload
- Review strategies (sleep, stress, nutrition)
- Acknowledge progress/provide motivation

### 4. Enhanced Program Builder (`/coach/program-builder`)

**Natural Language Adjustments**:
- **Voice Input Option**: Perplexity-style voice interface with animated visualization
- **Text Input Option**: Large text area
- **Pre-filled Example**: "Sarah mentioned knee discomfort during squats 3 times this week. Replace back squats with box squats and add single-leg work for stability."

**Interactive Program Editor**:
- **Drag & Drop**: Reorder exercises within days
- **Exercise Management**: 
  - Add new exercises with autocomplete/search
  - Remove exercises with confirmation
  - Edit rep ranges (e.g., "8-12 reps")
  - Edit RPE targets (e.g., "RPE 7-8")
  - Add exercise-specific notes
- **Program Structure**: 
  - Collapsible day sections
  - Clear visual hierarchy
  - Save/revert functionality

### 5. Add Client Flow (`/coach/clients/new`)

**Enhanced multi-step flow**:
- Basic information
- Goal setting (weight targets, activity goals, habits)
- Consultation transcript upload/paste
- Program generation preferences
- Program review and approval

---

## CLIENT PERSPECTIVE (`/client/*`)

### 1. Client Dashboard (`/client/dashboard`)

**Simple dual-entry interface**:
```
┌─────────────────────────────────┐
│          Welcome Back           │
│                                 │
│    ┌─────────┐  ┌─────────┐    │
│    │  TRAIN  │  │ RECORD  │    │
│    │         │  │         │    │
│    └─────────┘  └─────────┘    │
│                                 │
│ [Navigation: Program|History|Profile] │
└─────────────────────────────────┘
```

**Navigation Buttons** (bottom or side):
- "Program" → `/client/program`
- "History" → `/client/history` 
- "Profile" → `/client/profile` (non-functional for demo)

### 2. Training Program (`/client/program`)

**Traditional program view with enhanced tracking**:

**Program Display**:
- Current day highlighted
- Exercise list with prescribed sets/reps/RPE
- Previous performance shown for reference

**Performance Tracking Options** (per exercise):
- **Manual Entry**: 
  - Input fields for sets completed, weight, reps, RPE
  - "Save" button per exercise
- **Voice Input**: 
  - Microphone icon next to each exercise
  - Perplexity-style voice interface overlay
  - "Hold to record performance for [Exercise Name]"
  - Shows transcription + extracted data confirmation

### 3. Voice Recording (`/client/record`)

**Brain dump interface**:
- Perplexity-style voice interface (full screen)
- Large animated visualization with orbital dots
- "Hold to record" functionality
- **Purpose**: General context sharing (mood, energy, life updates, concerns)

### 4. Tracking History (`/client/history`)

**Comprehensive data source visualization**:

**Data Sources Legend**:
- Voice Input (Coach OS)
- Text Input (Coach OS)
- WhatsApp Integration
- Oura (sleep and recovery data)
- MyFitnessPal (nutrition data)

---

## Hardcoded Demo Data

### Enhanced Client Profiles

1. **Mike Johnson** (Highest Priority)
   - **Goals**: Lose 1.5 lbs/week, 1,800 cal/day, 10k steps, 7h sleep
   - **Performance**: Weight stalled (-0.2 lbs/week), calories 85% adherence, steps 70% adherence, sleep 6.2h avg
   - **Last check-in**: 3 days ago
   - **Issue**: High stress pattern detected, sleep deficit affecting progress

2. **Sarah Miller** (Medium Priority)  
   - **Goals**: Lose 1 lb/week, 1,600 cal/day, 4x training/week, daily rehab
   - **Performance**: Weight on track (-1.1 lbs/week), calories 95% adherence, training 75% frequency, rehab 57% compliance
   - **Last check-in**: 2h ago
   - **Issue**: Knee discomfort pattern, rehab compliance low

3. **Emma Chen** (Low Priority)
   - **Goals**: Maintain weight, 2,200 cal/day, 8k steps, daily creatine
   - **Performance**: All metrics 90-105% of targets
   - **Last check-in**: 2h ago  
   - **Status**: All goals on track

### Sample AI Insights

**Mike Johnson Insights**:
- "Weight loss stalled despite calorie adherence. Client reporting work deadline stress (4 mentions this week). Sleep averaging 6.2h vs 7h target. Recommend stress management check-in and potential diet break."

**Sarah Miller Insights**:
- "Knee discomfort mentioned during squats 3x this week. Rehab compliance at 57%. Recommend program modification to knee-friendly variations and rehab adherence discussion."

**Emma Chen Insights**:
- "Excellent adherence across all metrics. Training performance trending upward. Consider progressive overload adjustment in next program review."

---

## Enhanced Routing Structure

```
/coach/
├── / (login)
├── /dashboard
├── /clients/[id]/
│   ├── overview
│   ├── goals
│   ├── performance  
│   ├── data
│   ├── insights
│   └── program
├── /clients/new
└── /program-builder

/client/
├── /dashboard
├── /program  
├── /record
└── /history
```

---

## Enhanced Demo Flow Narrative

### Coach Demo (8 minutes)
1. **Login** (pre-filled, instant access)
2. **Dashboard Priority View** (see Mike needs intervention, Sarah needs adjustment)
3. **Mike's Profile - Performance Tab** (show weight stall vs targets, stress correlation)
4. **Mike's Insights** (AI recommendation for diet break and stress management)
5. **Sarah's Data Log** (show knee discomfort pattern in voice logs)
6. **Sarah's Goals Tab** (edit rehab compliance target)
7. **Program Adjustment** (voice input: "Replace back squats with box squats")
8. **Add New Client** (include goal setting in onboarding flow)

### Client Demo (3 minutes)
1. **Simple Dashboard** (Train vs Record options)
2. **Training Program** (voice performance entry with contextual notes)
3. **General Recording** (brain dump about stress levels)
4. **History View** (show multi-source data with nutrition/sleep integration)

---

## Success Criteria

**For Coaches**:
- Clear visibility into client progress vs goals
- Actionable AI insights that feel genuinely helpful
- Easy goal management and adjustment capabilities
- Comprehensive data view without overwhelming complexity
- Natural program modifications feel intuitive

**For Clients**:
- Voice input feels natural and effortless
- Multiple tracking options accommodate preferences
- Data integration shows comprehensive picture
- Interface is simple enough for all technical levels

Remember: This remains a DEMO focused on selling the vision. Every feature should support the narrative of making coaching more effective through AI-first insights and natural interaction design.