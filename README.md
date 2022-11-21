# cus-form-validate

A simple custom form validation that makes form validation fast and exactly.

### Instantiation:

    npm i cus-form-validate

    # or

    yarn add cus-form-validate

### Usage

Import module:

    import { validateForm } from 'cus-form-validate'

    # or

    import * as FormValidate from 'cus-form-validate'

Init form data:

    const formData = {
        email: {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: '',
            value: '',
            error: '',
            required: true,
            validate: {
                trim: true,
                required: true,
                minlength: 2,
                maxlength: 100,
                pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
        },
        point: {
            type: 'number',
            label: 'Point',
            placeholder: '',
            value: '',
            error: '',
            required: true,
            validate: {
                required: true,
                min: 0,
                max: 10,
            },
        }
    }

or

    const formData = {
        email: {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: '',
            value: '',
            error: '',
            required: true,
            validate: {
                trim: true,
                required: [true, 'Required.'],
                minlength: [2, 'Value length must be from 2 to 100 characters.'],
                maxlength: [100, 'Value length must be from 2 to 100 characters.'],
                pattern: [
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Invalid email address.',
                ],
            },
        },
        point: {
            type: 'number',
            label: 'Point',
            placeholder: '',
            value: '',
            error: '',
            required: true,
            validate: {
                required: true,
                min: [0, 'Value must be between 0 and 10.'],
                max: [10, 'Value must be between 0 and 10.'],
            },
        }
    }

Validate form data:

    const { formValid, validFormData, message } = validateForm(formData)

    # or

    const { formValid, validFormData, message } = FormValidate.validateForm(formData)

### Customization:

Comming soon.

### License

<!-- [MIT](https://choosealicense.com/licenses/mit/) license -->

Unlicense.
