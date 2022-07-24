import { Box, Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

import StartIcon from '@mui/icons-material/West';
import EndIcon from '@mui/icons-material/East';

import { useSprings, animated, useTransition, config } from '@react-spring/web';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  ICard,
  removeCard,
  placeAtStart,
  placeAtEnd,
  selectCardlist
} from './cardlistSlice';

export default function CardListView() {
  const cardlist = useAppSelector(selectCardlist);

  const dispatch = useAppDispatch();

  function handleClickPlaceEnd(index: number) {
    if (index === cardlist.length - 1) return;//do nothing
    springApi.start((i) => {
      let temp: any = {
        onRest: () => {
          springApi.set({ x: 0, opacity: 1 });
          dispatch(placeAtEnd(index))
        }
      }
      //animate only selected card
      if (i === index) {
        temp = { ...temp, x: 250, opacity: 0 }
      }
      return temp;
    })
  }

  function handleClickPlaceStart(index: number) {
    if (index === 0) return;//do nothing
    springApi.start((i) => {
      let temp: any = {
        reset: true,
        onRest: () => {
          springApi.set({ x: 0, opacity: 1 });
          dispatch(placeAtStart(index))
        }
      }
      if (i === index) {
        temp = { ...temp, x: -250, opacity: 0 }
      }
      return temp;
    })
  }

  const [springs, springApi] = useSprings(
    cardlist.length,
    item => ({ from: { opacity: 1, x: 0 } }),
  )
  const springsList: any = springs.map(s => s);

  const transitions = useTransition(cardlist, {
    // reset: true,
    from: { y: -500, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 500, opacity: 0 },
    delay: 80,
    trail: 50,
    config: config.wobbly

  })

  if (!cardlist.length) {
    return (
      <Typography sx={{ mt: 5 }} component={"h2"}>No Cards Here.</Typography>
    )
  }

  return (
    <Fragment>
      <Stack sx={{ mt: 5 }} spacing={1} direction="row" >
        {transitions(
          (style, card: ICard, t, index) => {
            return <animated.div
              style={{ ...style, ...springsList[index] }}
              key={card.name + card.color + index}
            >
              <DemoCard card={card}
                isFirst={index === 0}
                isLast={index === cardlist.length-1}
                onDelete={() => { dispatch(removeCard(index)) }}
                onPlaceStart={() => handleClickPlaceStart(index)}
                onPlaceEnd={() => handleClickPlaceEnd(index)}
              /> </animated.div>
          }
        )}
      </Stack>
    </Fragment>
  );
}

function DemoCard({ card: { name, color }, isFirst, isLast, onDelete, onPlaceStart, onPlaceEnd }: { card: ICard, isFirst: boolean, isLast: boolean, onDelete: (() => void), onPlaceStart: () => void, onPlaceEnd: () => void }) {
  return (
    <Card sx={{ backgroundColor: color, width: "8rem", height: "12rem" }} raised>
      <CardContent>
        <Typography align='center' gutterBottom variant="caption" component="div" sx={{ backgroundColor: "lightgray", borderRadius: "3px", color }}>
          {name}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent:"space-around" }}>

        {!isFirst &&
          <IconButton aria-label="previous" onClick={onPlaceStart} sx={{justifySelf:"left"}}>
            <StartIcon />
          </IconButton>
        } 

        {!isLast &&
          <IconButton aria-label="next" onClick={onPlaceEnd} sx={{placeSelf:"right"}}>
            <EndIcon />
          </IconButton>
        }
      </Box>


      <CardActions >
        <Button variant="contained" color="error" size="small" onClick={onDelete}
          sx={{ margin: "auto" }}>Remove</Button>
      </CardActions>
    </Card>
  )
}
