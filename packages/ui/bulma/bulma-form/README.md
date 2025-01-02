# bulma-form

This Angular package provides a Bulma-styled implementation of dynamic forms using `@ngxui/form-core`. It allows developers to create responsive, dynamic forms seamlessly integrated with Bulma's CSS framework.

### Quick Links

🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/ngxui-bulma-form)


## Prerequisites

1. Ensure Bulma CSS is included in your project:
   ```bash
   npm install bulma --save
   ```
   
2. Import the required in your project:
      ```bash
      node_modules/bulma/css/bulma.min.css
      node_modules/@ng-select/ng-select/themes/default.theme.css
   ```

3. Install `@ngxui/bulma-form`:
   ```bash
   npm install @ngxui/bulma-form --save
   ```
   
4. Ensure  that the `provideZoneChangeDetection` and `provideHttpClient` are included in your application configuration before bootstrapping the `App` component.



## Usage

### Import the Module

Add the module to your Angular application:
```typescript
import { NgxBulmaFormBuilderComponent } from '@ngxui/bulma-form';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxBulmaFormBuilderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Component Integration

Use the `ngxui-bulma-form` component in your templates:
```html
<ngxui-bulma-form
  [formConfig]="formConfig"
  [parentFormGroup]="formGroup"
  [isSubmitted]="isSubmitted"
></ngxui-bulma-form>
```

### Inputs

| Input             | Type         | Description                                                                 |
|-------------------|--------------|-----------------------------------------------------------------------------|
| `parentFormGroup` | `FormGroup`  | Parent form group to which the dynamic form group will be added. (Required) |
| `isSubmitted`     | `boolean`    | Tracks whether the form has been submitted. (Required)                      |
| `formConfig`      | `FormConfig` | The configuration for the dynamic form group. (Required)                    |

### Example FormConfig

```typescript
const formConfig: FormConfig = {
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
                placeholder: 'Enter your full name',
                disabled: false,
              },
              validators: [
                {
                  name: 'required',
                  message: 'First name is required',
                },
              ],
            },
            {
              name: 'email',
              type: 'input',
              options: {
                label: 'Email Address',
                placeholder: 'Enter your email',
              },
              validators: [
                {
                  name: 'required',
                  message: 'Email is required',
                },
                {
                  name: 'email',
                  message: 'Email is invalid',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

### Styles
- The component uses Bulma for styling. Ensure Bulma classes are applied appropriately in your project.
- Customize styles by overriding Bulma variables or adding custom CSS classes.

### Features
- **Dynamic Form Group Creation**: The component dynamically creates a nested `FormGroup` structure based on `formConfig`.
- **Bulma Integration**: Utilizes Bulma classes for a responsive and elegant UI.
- **Field Validators**: Validators can be dynamically added via `FormConfig`.
- **Conditional Display**: Fields can be conditionally shown or hidden based on other field values using the `conditional` property.



## Running unit tests

Run `nx test bulma-form` to execute the unit tests.


## License
This project is licensed under the MIT License.

