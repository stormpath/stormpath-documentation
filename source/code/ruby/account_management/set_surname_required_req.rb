schema = directory.account_schema

fields = schema.fields

surname_field = schema.fields.search(name: 'surname').first
surname_field.required = true

surname_field.save
