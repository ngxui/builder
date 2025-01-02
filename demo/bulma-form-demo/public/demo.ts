import { FormConfig } from '@ngxui/form-core';

export const formDemo:FormConfig = {
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
    {
      name: 'Preferences',
      rows: [
        {
          fields: [
            {
              name: 'subscribe',
              type: 'checkbox',
              options: {
                label: 'Subscribe to newsletter',
                value: false,
                helperText: 'Stay updated with our latest news',
              },
              validators: [],
              layout: {
                width: 4,
              },
            },
            {
              name: 'preferredContact',
              type: 'radio',
              options: {
                label: 'Preferred Contact Method',
                value: 'email',
                optionsList: [
                  {
                    label: 'Email',
                    value: 'email',
                  },
                  {
                    label: 'Phone',
                    value: 'phone',
                  },
                  {
                    label: 'None',
                    value: 'none',
                  },
                ],
              },
              validators: [],
            },
          ],
        },
      ],
    },
    {
      name: 'AdditionalInfo',
      rows: [
        {
          fields: [
            {
              name: 'country',
              type: 'select',
              options: {
                label: 'Country',
                placeholder: 'Select your country',
                optionsList: [
                  {
                    label: 'United States',
                    value: 'US',
                  },
                  {
                    label: 'Canada',
                    value: 'CA',
                  },
                  {
                    label: 'United Kingdom',
                    value: 'UK',
                  },
                ],
              },
              validators: [],
            },
            {
              name: 'skills',
              type: 'multi-select',
              options: {
                label: 'Skills',
                value: ['programming', 'design'],
                optionsList: [
                  {
                    label: 'Programming',
                    value: 'programming',
                  },
                  {
                    label: 'Design',
                    value: 'design',
                  },
                  {
                    label: 'Writing',
                    value: 'writing',
                  },
                ],
              },
              validators: [],
            },
            {
              name: 'hobbies',
              type: 'auto-complete',
              options: {
                label: 'Hobbies',
                placeholder: 'Start typing...',
                optionsList: [
                  {
                    label: 'Favorite Hobby',
                    value: 'Reading',
                  },
                  {
                    label: 'Creative Pursuit',
                    value: 'Photography',
                  },
                  {
                    label: 'Leisure Activity',
                    value: 'Fishing',
                  },
                  {
                    label: 'Musical Interest',
                    value: 'Playing Guitar',
                  },
                ],
                loader: {
                  isLazyLoadEnabled: true,
                  dataUrl: 'http://localhost:8000/search/hobbies',
                  requestMethod: 'GET',
                  header: {
                    Authorization: 'Bearer YOUR_TOKEN',
                  },
                },
              },
              validators: [],
            },
          ],
        },
      ],
    },
    {
      name: 'FamilyInfo',
      rows: [
        {
          fields: [
            {
              name: 'have_kids',
              type: 'checkbox',
              options: {
                label: 'Have Kids',
                helperText: 'select Yes to fill kids information',
                optionsList: [
                  {
                    label: 'Yes',
                    value: true,
                  },
                ],
              },
              validators: [],
              layout: {
                width: 4,
              },
            },
            {
              name: 'kids_number',
              type: 'number',
              options: {
                label: 'Kids Number',
                conditional: {
                  display: [['FamilyInfo.have_kids', '=', true]],
                  disabled: null,
                },
                helperText:
                  'display if have_kids = true; is valid if kids_number > 0 ',
                additional_properties: null,
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
              layout: {
                width: 2,
              },
            },
            {
              name: 'first_kid_name',
              type: 'input',
              options: {
                label: 'First Kid Name',
                conditional: {
                  display: [['FamilyInfo.have_kids', '=', true]],
                  disabled: [['FamilyInfo.kids_number', '<', 1]],
                },
                placeholder: 'Start typing...',
                helperText:
                  'display if have_kids = true; disabled if kids_number < 1',
              },
              validators: [],
            },
            {
              name: 'second_kid_name',
              type: 'input',
              options: {
                label: 'First Kid Name',
                conditional: {
                  display: [['FamilyInfo.have_kids', '=', true]],
                  disabled: [
                    ['FamilyInfo.first_kid_name', 'in', [null, '']],
                    '|',
                    ['FamilyInfo.kids_number', '<', 2],
                  ],
                },
                placeholder: 'Start typing...',
                helperText:
                  'display if have_kids = true; disabled if kids_number < 2 and first_kid_name is Empty',
              },
              validators: [],
            },
          ],
        },
        {
          fields: [
            {
              name: 'comment',
              type: 'text',
              options: {
                label: 'Comment',
                helperText: 'Add Comment',
              },
              validators: [],
              layout: {
                width: 4,
              },
            },
          ],
        },
      ],
    },
  ],
};
