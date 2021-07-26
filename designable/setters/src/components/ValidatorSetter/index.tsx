import React, { Fragment, useMemo, useState } from 'react'
import cls from 'classnames'
import { Modal, Button } from 'antd'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { usePrefix, useTheme, TextWidget } from '@designable/react'
import { ValidatorPanel } from './ValidatorPanel'
import './styles.less'

export interface IValidatorSetterProps {
  className?: string
  style?: React.CSSProperties
  onChange: (v) => void
  value: any
}
export const ValidatorSetter: React.FC<IValidatorSetterProps> = observer(
  (props) => {
    const { className, value = [], onChange } = props
    const theme = useTheme()
    const prefix = usePrefix('validator-setter')
    const [modalVisible, setModalVisible] = useState(false)
    const rules: any = useMemo(
      () =>
        observable({
          'x-validator': props.value,
        }),
      [value, modalVisible]
    )

    return (
      <Fragment>
        <Button block onClick={() => setModalVisible(true)}>
          <TextWidget token="SettingComponents.ValidatorSetter.configureValidator" />
        </Button>
        <Modal
          width={'65%'}
          title={
            <TextWidget token="SettingComponents.ValidatorSetter.configureValidator" />
          }
          bodyStyle={{ padding: 10 }}
          transitionName=""
          maskTransitionName=""
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => {
            onChange(rules['x-validator'])
            setModalVisible(false)
          }}
        >
          <div
            className={`${cls(prefix, className)} ${prefix + '-' + theme} ${
              prefix + '-layout'
            }`}
          >
            <div className={`${prefix + '-layout-item right'}`}>
              <ValidatorPanel rules={rules}></ValidatorPanel>
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
)
