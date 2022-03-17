import { useState } from 'react'
import { HStack, Box } from './../../elements/LayoutPrimitives'
import { AIcon } from '../../elements/images/AIcon'
import { Button } from '../../elements/Button'
import { TooltipWrapped } from '../../elements/Tooltip'
import { TickedRangeSlider } from '../../elements/TickedRangeSlider'
import { styled, theme } from '../../tokens/stitches.config'
import { DotsThree, X, TextAa } from 'phosphor-react'

type FloatingActionButtonsProps = {
  onFontSizeChange: (value: number) => any
  fontSize: number,
}

type Actions = 'font' | undefined;

const BorderStyles = {
  borderWidth: 1,
  borderRadius: 32,
  borderStyle: 'solid',
  borderColor: theme.colors.grayBorder,
}

const BgStyles = {
  backgroundColor: 'white',
}

const ContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 48,
  width: 48,
}

const ButtonCss = {
  ...ContainerStyles,
  padding: 2,
  border: '1px solid $grayBorder',
  borderRadius: 32,

  '&:hover': {
    height: 55,
    width: 55,
    boxShadow: '0px 4px 16px rgba(32, 31, 29, 0.33)',
  }
}

const FlexContainer = styled(Box, {
  display: 'flex',
})

const ActionContainerButton = styled(Button, ButtonCss)
const ActionContainerHStack = styled(HStack, {
  ...ContainerStyles,
  width: 220,
})

export function FloatingActionButtons(
  props: FloatingActionButtonsProps
): JSX.Element {

  const [showButtons, setShowButtons] = useState(false);
  const [currentAction, setCurrentAction] = useState<Actions>(undefined);
  const [fontSize, setFontSize] = useState(props.fontSize ?? 20);

  const handleOpenClose = () => {
    if (!!currentAction) {
      setCurrentAction(undefined)
    }

    setShowButtons(!showButtons);
  }

  const handleFontChange = (value : number) => {
    setFontSize(value);
    props.onFontSizeChange(value);
  }

  const showCurrentActionButton = (action: Actions) => {
    switch (action) {
      case 'font':
        return (
          <ActionContainerHStack distribution='between' css={{$gap: '$2', alignItems: 'center', px: 12, ...BgStyles, ...BorderStyles}}>
            <Box css={{pt: 7}}>
              <AIcon style={{padding: 3}} color='#000000' size={24} />
            </Box>
            <TickedRangeSlider value={fontSize} onChange={handleFontChange} />
            <Box css={{pt: 6}}>
              <AIcon color='#000000' size={24} />
            </Box>
          </ActionContainerHStack>
        )
      default:
        null;
    }
  }

  return (
    <HStack distribution="between" alignment="end" css={{
      gap: '$2',
      position: 'fixed',
      flexDirection: 'row-reverse',
      bottom: 82,
      right: 24,

      "@smDown": {
        bottom: 101,
        right: 18,
      }
      }}>
      <ActionContainerButton style="plainIcon" css={{...BgStyles, ...BorderStyles}} onClick={handleOpenClose}>
        {showButtons ? <X size={24} color='#000000' /> : <DotsThree size={24} color='#000000' />}
      </ActionContainerButton>
      {(showButtons && !currentAction) && (
        <HStack distribution="evenly" alignment='end' css={{gap: '$2'}}>
          <TooltipWrapped tooltipContent='Increase or Decrease Font Sizes' side='top' align='center'>
            <ActionContainerButton style='plainIcon' css={{...BgStyles, ...BorderStyles}} onClick={() => setCurrentAction('font')}>
              <FlexContainer>
                <TextAa color='#000000' size={24} />
              </FlexContainer>
            </ActionContainerButton>
          </TooltipWrapped>
        </HStack>
      )}
      {showCurrentActionButton(currentAction)}
    </HStack>
  )
}
