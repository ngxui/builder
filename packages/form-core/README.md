# @ngxui/form-core


## Overview
@ngxui/form-core simplifies creating dynamic forms in Angular by using a JSON configuration object called `FormConfig`. It allows developers to configure form fields, validations, conditional visibility, and more with minimal effort. This guide explains the structure and functionality of the `FormConfig` and its components.



### Quick Links

🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/ngxui-form-core)


## Installation

Install the package via npm:
```bash
npm install @ngxui/form-core
```


## Running unit tests

Run `nx test form-core` to execute the unit tests.


## Usage

### Import the Module

extends FormCoreComponent:

```typescript
import { FormCoreComponent } from '@ngxui/form-core';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule extends  FormCoreComponent{}
```

### Component Integration

see `@ngxui/bulma-form`:
```html
<your-component
  [parentFormGroup]="parentFormGroup"
  [isSubmitted]="isSubmitted"
  [formConfig]="formConfig"
></your-component>
```

### Inputs

| Input              | Type          | Description                                                                 |
|--------------------|---------------|-----------------------------------------------------------------------------|
| `parentFormGroup`  | `FormGroup`   | Parent form group to which the dynamic form group will be added. (Required)|
| `isSubmitted`      | `boolean`     | Tracks whether the form has been submitted. (Required)                     |
| `formConfig`       | `FormConfig`  | The configuration for the dynamic form group. (Required)                   |


# Ngx-Builder: Dynamic Form Configuration Documentation


## Example FormConfig
Below is an example configuration:

```typescript
const formDemo: FormConfig = {
  name: 'UserProfileForm',
  groups: [
    {
      name: 'PersonalDetails',
      rows: [
        {
          fields: [
            {
              name: 'firstName',
              type: 'input',
              options: {
                label: 'First Name',
                disabled: false,
                placeholder: 'Enter your First name',
              },
              validators: [
                {
                  name: 'required',
                  message: 'First name is required',
                },
              ],
            },
            {
              name: 'lastName',
              type: 'input',
              options: {
                label: 'Last Name',
                disabled: false,
                conditional: {
                  disabled: [['PersonalDetails.firstName', 'in', [null, '']]],
                },
                placeholder: 'Enter your last name',
              },
              validators: [
                {
                  value: '^[A-Za-z\\s]+$',
                  name: 'pattern',
                  message: 'NOT a valid name',
                },
              ],
            },
            {
              name: 'email',
              type: 'input',
              options: {
                label: 'Email Address',
                disabled: false,
                placeholder: 'Enter your email',
              },
              validators: [
                {
                  name: 'required',
                  message: 'Email is required',
                  enableCondition: [
                    ['Preferences.subscribe', '=', true],
                    '|',
                    ['Preferences.preferredContact', '=', 'email'],
                  ],
                },
                {
                  name: 'email',
                  message: 'Email is invalid',
                  enableCondition: [
                    ['Preferences.subscribe', '=', true],
                    '|',
                    ['Preferences.preferredContact', '=', 'email'],
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // Other groups omitted for brevity
  ],
};
```

---

## Field Types

| **Field Type**    | **Description**                                      | **Options**                                                                                               |
|-------------------|------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `input`           | Standard text input field.                           | `label`, `disabled`, `placeholder`                                                                       |
| `text`            | textArea  field.                                     | `label`, `disabled`, `placeholder`                                                                       |
| `checkbox`        | Checkbox input for boolean values.                   | `label`, `value`, `helperText`                                                                           |
| `radio`           | Radio buttons for selecting one value from a list.   | `label`, `value`, `optionsList`                                                                          |
| `select`          | Dropdown selection.                                  | `label`, `placeholder`, `optionsList`                                                                    |
| `multi-select`    | Multiple-selection dropdown.                         | `label`, `value`, `optionsList`                                                                          |
| `auto-complete`   | Autocomplete text input with dynamic option loading. | `label`, `placeholder`, `optionsList`, `loader.isLazyLoadEnabled`, `loader.dataUrl`, `loader.requestMethod` |
| `number`          | Numeric input field.                                 | `label`, `placeholder`                                                                                   |

---

## Validators

| **Validator**       | **Description**                                                                 | **Options**                                     |
|----------------------|---------------------------------------------------------------------------------|------------------------------------------------|
| `required`           | Marks the field as mandatory.                                                 | `message`, `enableCondition`                   |
| `minLength`          | Ensures the value has a minimum length.                                        | `value`, `message`, `enableCondition`          |
| `pattern`            | Validates the value against a regex pattern.                                  | `value`, `message`, `enableCondition`          |
| `nullValidator`      | Ensures the field value is `null`.                                             | `message`                                      |
| `requiredTrue`       | Ensures the value is `true` (for checkboxes).                                  | `message`                                      |
| `domainValidator`    | Validates the field based on custom conditions involving other fields.         | `value` (condition array), `message`           |

---

## Dynamic Features

### Conditional Display and Disable
Fields can be shown/hidden or enabled/disabled based on conditions.
- **Conditional Display**: Use `options.conditional.display` to define conditions for visibility.
- **Conditional Disable**: Use `options.conditional.disabled` to define conditions for enabling/disabling a field.

Example:
```typescript
{
  name: 'kids_number',
  type: 'number',
  options: {
    label: 'Kids Number',
    conditional: {
      display: [['FamilyInfo.have_kids', '=', true]],
    },
  },
  validators: [
    {
      value: [
        ['FamilyInfo.kids_number', '>', 0],
        '&',
        ['FamilyInfo.have_kids', '=', true],
      ],
      name: 'domainValidator',
      message: 'Value must be > 0',
    },
  ],
},
```

### Lazy Loading for Options
For `multi-select` and `auto-complete` fields, options can be dynamically loaded using an API.
- Set `options.loader.isLazyLoadEnabled` to `true`.
- Provide the `dataUrl` and `requestMethod` for the API.
- Optionally, add headers (e.g., `Authorization`).

Example:
```typescript
{
  name: 'hobbies',
  type: 'auto-complete',
  options: {
    label: 'Hobbies',
    placeholder: 'Start typing...',
    loader: {
      isLazyLoadEnabled: true,
      dataUrl: 'http://localhost:8000/search/hobbies',
      requestMethod: 'GET',
      header: {
        Authorization: 'Bearer YOUR_TOKEN',
      },
    },
  },
},
```

---

## Layout and Grouping
Fields can be grouped into logical sections using `groups` and further divided into rows:
- **Groups**: Represent sections of the form.
- **Rows**: Represent horizontal alignments of fields within a group.
- **Fields**: Individual form controls.

Example:
```typescript
{
  name: 'PersonalDetails',
  rows: [
    {
      fields: [
        { name: 'firstName', type: 'input', ... },
        { name: 'lastName', type: 'input', ... },
      ],
    },
  ],
},
```

---





## License
This project is licensed under the MIT License.

