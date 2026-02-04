# VA Portal - Multi-Tab User/Client Form Structure

## 📋 Tab Structure from Original Project

Based on the original ASP.NET MVC project at `/Staff/User/Edit`, the user/client creation and editing form has **9 major tabs**:

### 1. **Start Here Tab** (`startInfoTab`)
**Purpose**: Introduction and initial setup
- Situation selection (Surviving Spouse, Single Veteran, Married Vet Needs Care, etc.)
- Status selection
- Email address
- Account creation option
- Lock/Unlock account settings

### 2. **Intent to File Tab** (`formInfoTab`)
**Purpose**: Intent to File form generation
- Veteran's Date of Birth (Intent)
- Veteran's SSN (Intent)
- Previous VA claim status
- Veteran's Gender
- Service Number
- Mailing Address (Intent)
- Contact Phone (Intent)
- Who Signs Paperwork
- **Action**: Download Intent to File Form button

### 3. **General Tab** (`generalInfoTab`)
**Purpose**: General information and settings
- Allow User to Generate Application checkbox
- Lockout Enabled
- Situation (dropdown with 5 options)
- Status (dropdown)
- Client Email
- Need Create Account (Yes/No radio)
- Need Home Care checkboxes (Client and Spouse)
- Home Care Count
- Need Senior Living Care checkboxes
- Veteran Name fields (First, Middle, Last)
- Spouse Name fields (First, Middle, Last) - if applicable

### 4. **Contact Tab** (`contactInfoTab`)
**Purpose**: Contact information
- Phone Numbers (Primary, Mobile, Home, Work)
- Primary Contact First Name
- Primary Contact Last Name
- Mailing Address:
  - Street Address
  - City
  - State (dropdown)
  - ZIP Code
  - Country
- Security Question (dropdown and answer)

### 5. **Personal Tab** (`personalInfoTab`)
**Purpose**: Personal details
- Veteran's Date of Birth
- Veteran's SSN
- Veteran's Gender (Male/Female radio)
- Veteran's Marriage History:
  - Current Marriage Status (dropdown)
  - Marriage details (multiple marriages possible)
  - Spouse First/Middle/Last Name
  - Marriage Start Date
  - Marriage End Date (if applicable)
  - Marriage End Reason (if applicable)

### 6. **Health Tab** (`healthInfoTab`)
**Purpose**: Medical and health information
- HIPAA Authorization text/agreement
- Home Care Section:
  - Weekly Home Care Hours
  - Monthly Home Care Cost
  - Home Care Provider Name
  - Home Care Provider Phone
- Senior Living Care Section:
  - Facility Name
  - Facility Type
  - Monthly Cost
  - Facility Phone
- Help With (ADL - Activities of Daily Living):
  - Bathing
  - Dressing
  - Eating
  - Toileting
  - Transferring
  - Mobility
- Medical Diagnoses:
  - List of conditions
  - Date of diagnosis
- Unreimbursed Medical Expenses:
  - Medicare Part B
  - Medicare Part D
  - Supplemental Insurance Premium
  - Other Medical Expenses

### 7. **Military Tab** (`militaryInfoTab`)
**Purpose**: Military service information
- Service Information:
  - Branch of Service
  - Service Start Date
  - Service End Date
  - Served Under Another Name (Yes/No)
  - Other Names Used
  - Was War Prisoner (Yes/No)
  - POW Period Start/End
- Service Number
- VA File Number
- VA Claim Number
- Previous VA Claim Filed (Yes/No)
- Currently Receiving VA Benefits (Yes/No)

### 8. **Financial Tab** (`financialInfoTab`)
**Purpose**: Financial and asset information
- Pre-text explaining financial requirements
- Have More Than $25K in Assets (Yes/No)
- Asset Questions:
  - Primary Residence:
    - Own Primary Residence (Yes/No)
    - Lot Size
    - Could Part Be Sold
    - Market Value
    - Owed/Mortgaged
  - IRAs, 401K, 403b, SEP Accounts
  - Trusts
  - Annuities
  - Royalties
  - Other Real Estate
  - Vehicles
  - Bank Accounts
  - Stocks/Bonds
  - Life Insurance Cash Value
  - Other Assets
- Income Questions:
  - Social Security Benefits
  - Retirement Income (next 12 months)
  - Unemployment Income
  - Savings Bonds Interest
  - Business Income
  - Interest/Royalty/Dividend Income
  - Wages
  - Other Income
  - Waived Income
- Asset Transfers:
  - Transferred assets to trust or purchased annuity
  - Transfer Date
  - Transfer Value
  - Trust Tax ID
  - Transfer Type
- Not Reported Assets/Income

### 9. **VA Direct Deposit Tab** (`otherInfoTab`)
**Purpose**: Payment information
- Bank Name
- Routing Number
- Account Number
- Account Type (Checking/Savings)

### 10. **Supporting Documents Tab** (`filesTab`)
**Purpose**: File uploads
- Required Documents:
  - DD 214 (Discharge Papers)
  - Marriage Certificate
  - Death Certificate (if applicable)
  - Medical Records
  - Financial Documents
- Additional Documents:
  - Misc. Forms
  - Other Supporting Documents
- File upload interface
- Private/Public flag for files
- View/Download uploaded files

## 🎯 Key Features to Implement

### Progress Bar
- Shows completion percentage (0-100%)
- Updates as tabs are filled out
- Located at top of form

### Auto-Save Functionality
- Form saves automatically on field change
- No need to click "Save" button
- Background AJAX save
- Visual indicator of save status

### Conditional Logic
- Fields show/hide based on selections
- Example: "Married Vet Both Need Care" shows different fields than "Single Veteran"
- Vue.js components handle conditional rendering

### Situation-Based Forms
The form structure changes dramatically based on "Situation" selection:

1. **Surviving Spouse** (situation = 1)
   - Shows spouse as primary person
   - Includes deceased veteran information
   - Different financial questions

2. **Single Veteran** (situation = 2)
   - Shows only veteran information
   - No spouse fields

3. **Married Vet - Veteran Needs Care** (situation = 3)
   - Veteran is primary care recipient
   - Spouse information included

4. **Married Vet - Spouse Needs Care** (situation = 4)
   - Spouse is primary care recipient
   - Veteran information included

5. **Married Vet - Both Need Care** (situation = 5)
   - Both veteran and spouse need care
   - Dual care sections

### Validation
- Required fields marked with red asterisk
- Real-time validation as user types
- Tab-level validation (can't proceed if required fields empty)
- Visual indicators for completed tabs

### PDF Generation
- **Intent to File Form**: Generated from Intent to File tab
- **Full Application**: Generated from all tabs combined
- "Convert to PDF" button (for admin/staff)
- "Download PDF" button (when form is complete)

### Lock Mechanisms
- Representative users can't edit certain fields once form is completed
- Admin users have full control
- Fields turn gray when locked
- Status-based locking (e.g., after "Completed" status)

## 🔧 Implementation Approach for React

### Recommended Structure:

```
src/pages/staff/clients/
  ├── ClientsList.tsx (✅ Done)
  ├── ClientDetails.tsx (✅ Done)
  └── ClientEdit.tsx (needs major update to multi-tab)
      └── tabs/
          ├── StartHereTab.tsx
          ├── IntentToFileTab.tsx
          ├── GeneralTab.tsx
          ├── ContactTab.tsx
          ├── PersonalTab.tsx
          ├── HealthTab.tsx
          ├── MilitaryTab.tsx
          ├── FinancialTab.tsx
          ├── VaDirectDepositTab.tsx
          └── SupportingDocumentsTab.tsx
```

### React Tab Component Pattern:

```typescript
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

// Or use custom tab component with:
const [activeTab, setActiveTab] = useState('startHere');
const [formData, setFormData] = useState({...});

// Tabs array
const tabs = [
  { id: 'startHere', label: 'Start Here', completed: false },
  { id: 'intentToFile', label: 'Intent to File', completed: false },
  // ... rest of tabs
];

// Progress calculation
const calculateProgress = () => {
  const completed = tabs.filter(t => t.completed).length;
  return (completed / tabs.length) * 100;
};
```

### Auto-Save Implementation:

```typescript
import { useDebounce } from 'use-debounce';

const [formData, setFormData] = useState({...});
const [debouncedFormData] = useDebounce(formData, 1000);

useEffect(() => {
  // Auto-save when debounced data changes
  saveFormData(debouncedFormData);
}, [debouncedFormData]);
```

### Conditional Rendering Based on Situation:

```typescript
{situation === 'singleVeteran' && <SingleVeteranFields />}
{situation === 'survivingSpouse' && <SurvivingSpouseFields />}
{situation === 'marriedVetBothCare' && <BothNeedCareFields />}
```

## 📊 Form Field Count Estimate

- **Total Fields**: ~200-300 fields depending on situation
- **Required Fields**: ~50-80 fields
- **Conditional Fields**: ~100 fields
- **File Uploads**: Multiple files per category
- **Dynamic Sections**: Marriage history, dependents, assets (repeating sections)

## 🎨 UI Considerations

### Senior-Friendly Design
- Large font sizes (already implemented: 18px base)
- High contrast
- Clear tab labels
- Progress indicators
- Help text and tooltips for complex questions
- Large touch targets for buttons

### Responsive Design
- Tabs stack on mobile
- Forms remain single column on mobile
- Large buttons for tab navigation
- Sticky progress bar
- Sticky save indicator

## 🚀 Next Steps

1. ✅ Basic ClientEdit form exists (simple version)
2. ⏳ **Need to upgrade to multi-tab version**
3. ⏳ Create individual tab components
4. ⏳ Implement auto-save functionality
5. ⏳ Add progress bar
6. ⏳ Implement conditional logic per situation
7. ⏳ Add validation per tab
8. ⏳ Implement PDF generation hooks
9. ⏳ Add file upload functionality
10. ⏳ Connect to backend API

## 💡 Important Notes

- The current `ClientEdit.tsx` is a simplified version
- The full implementation requires breaking it into **10 separate tab components**
- Each tab needs its own validation logic
- The form needs **auto-save** (not manual save)
- **Progress tracking** is essential for user experience
- The form structure **changes dynamically** based on "Situation" selected
- This is the most complex form in the entire application

---

**This is a MAJOR undertaking** - the user edit/create form is essentially a mini-application within the application. It would take significant time to fully replicate all tabs with all fields and conditional logic.

**Current Status**: We have a simplified single-page form. The original has 10 tabs with 200+ fields and complex conditional logic.
