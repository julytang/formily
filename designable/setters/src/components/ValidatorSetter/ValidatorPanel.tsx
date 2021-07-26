import React, { useMemo } from 'react'
import {
  ArrayItems,
  Form,
  Input,
  FormItem,
  ArrayCards,
  Select,
  Switch,
} from '@formily/antd'
import { InputNumber } from 'antd'
import { createForm, onFieldReact } from '@formily/core'
import { observer } from '@formily/reactive-react'
import { createSchemaField } from '@formily/react'
import { ValueInput, MonacoInput } from '@designable/react-settings-form'
import { usePrefix } from '@designable/react'
import './styles.less'
import {
  triggerTypeOptions,
  formatOptions,
  validatorTypeOptions,
} from './options'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayItems,
    ValueInput,
    ArrayCards,
    Select,
    Switch,
    InputNumber,
    MonacoInput,
  },
})

export interface IDataSettingPanelProps {
  className?: string
  style?: React.CSSProperties
  rules: any
}

export const ValidatorPanel: React.FC<IDataSettingPanelProps> = observer(
  (props) => {
    const prefix = usePrefix('validator-setter')
    const form = useMemo(
      () =>
        createForm({
          values: props.rules,
          effects() {
            onFieldReact('x-validator.*.format', (field) => {
              field.display =
                field.query('.validatorType').value() === 'FORMAT'
                  ? 'visible'
                  : 'none'
            })
            onFieldReact(
              '*(x-validator.*.required, x-validator.*.max, x-validator.*.maximum, x-validator.*.exclusiveMaximum, x-validator.*.min, x-validator.*.minimum, x-validator.*.exclusiveMinimum, x-validator.*.len, x-validator.*.whitespace)',
              (field) => {
                field.display =
                  field.query('.validatorType').value() === 'INNER'
                    ? 'visible'
                    : 'none'
              }
            )
            onFieldReact('x-validator.*.pattern', (field) => {
              field.display =
                field.query('.validatorType').value() === 'REG'
                  ? 'visible'
                  : 'none'
            })
            onFieldReact('x-validator.*.validator', (field) => {
              field.display =
                field.query('.validatorType').value() === 'CUSTOM'
                  ? 'visible'
                  : 'none'
            })
            onFieldReact(
              '*(x-validator.*.triggerType, x-validator.*.message)',
              (field) => {
                field.display =
                  field.query('.validatorType').value() !== undefined
                    ? 'visible'
                    : 'none'
              }
            )
          },
        }),
      [props.rules]
    )
    return (
      <div className={`${prefix + '-layout-item-content'}`}>
        <Form form={form}>
          <SchemaField>
            <SchemaField.Array
              name="x-validator"
              maxItems={5}
              x-decorator="FormItem"
              x-component="ArrayCards"
              x-component-props={{
                title: '检验规则',
              }}
            >
              <SchemaField.Object>
                <SchemaField.Void x-component="ArrayCards.Index" />
                <SchemaField.String
                  title="校验类型"
                  name="validatorType"
                  x-component="Select"
                  x-decorator="FormItem"
                  enum={validatorTypeOptions}
                />
                <SchemaField.String
                  title="触发类型"
                  name="triggerType"
                  x-component="Select"
                  x-decorator="FormItem"
                  enum={triggerTypeOptions}
                />
                <SchemaField.String
                  title="内置格式校验"
                  name="format"
                  x-component="Select"
                  x-decorator="FormItem"
                  enum={formatOptions}
                />
                <SchemaField.Boolean
                  title="必填"
                  name="required"
                  x-component="Switch"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  title="正则表达式"
                  name="pattern"
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="max"
                  name="max"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="maximum"
                  name="maximum"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="exclusiveMaximum"
                  name="exclusiveMaximum"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="min"
                  name="min"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="minimum"
                  name="minimum"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="exclusiveMinimum"
                  name="exclusiveMinimum"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Number
                  title="len"
                  name="len"
                  x-component="InputNumber"
                  x-decorator="FormItem"
                />
                <SchemaField.Boolean
                  title="允许空格"
                  name="whitespace"
                  x-component="Switch"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  title="校验函数"
                  name="validator"
                  x-component="MonacoInput"
                  x-decorator="FormItem"
                />
                <SchemaField.String
                  title="提示消息"
                  name="message"
                  x-component="Input"
                  x-decorator="FormItem"
                />
                <SchemaField.Void x-component="ArrayCards.MoveUp" />
                <SchemaField.Void x-component="ArrayCards.MoveDown" />
                <SchemaField.Void x-component="ArrayCards.Remove" />
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayCards.Addition"
                title="添加规则"
              />
            </SchemaField.Array>
          </SchemaField>
        </Form>
      </div>
    )
  }
)
