import{r as g,j as t,q as w,bb as u,bv as b,B as y}from"./index-DNYnb78v.js";import{T as x,P as k,a as T,C as D,b as R}from"./PropTable-BJA3at5K.js";import{P as S}from"./PreviewSwitch-VwZeMNsv.js";import{C as B}from"./Customize-Ddje7XkC.js";import{P as p}from"./PreviewSlider-fY0WOSA-.js";import{D as q}from"./Dependencies-ChngNZXI.js";import{u as M}from"./useForceRerender-D3ukqnMi.js";import"./index-CnVdu7zC.js";function j({children:d,onSendToBack:m,sensitivity:i}){const s=u(0),n=u(0),h=b(n,[-100,100],[60,-60]),o=b(s,[-100,100],[-60,60]);function l(f,a){Math.abs(a.offset.x)>i||Math.abs(a.offset.y)>i?m():(s.set(0),n.set(0))}return t.jsx(w.div,{className:"card-rotate",style:{x:s,y:n,rotateX:h,rotateY:o},drag:!0,dragConstraints:{top:0,right:0,bottom:0,left:0},dragElastic:.6,whileTap:{cursor:"grabbing"},onDragEnd:l,children:d})}function N({randomRotation:d=!1,sensitivity:m=200,cardDimensions:i={width:208,height:208},cardsData:s=[],animationConfig:n={stiffness:260,damping:20},sendToBackOnClick:h=!1}){const[o,l]=g.useState(s.length?s:[{id:1,img:"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"},{id:2,img:"https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"},{id:3,img:"https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"},{id:4,img:"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"}]),f=a=>{l(c=>{const r=[...c],e=r.findIndex(C=>C.id===a),[v]=r.splice(e,1);return r.unshift(v),r})};return t.jsx("div",{className:"stack-container",style:{width:i.width,height:i.height,perspective:600},children:o.map((a,c)=>{const r=d?Math.random()*10-5:0;return t.jsx(j,{onSendToBack:()=>f(a.id),sensitivity:m,children:t.jsx(w.div,{className:"card",onClick:()=>h&&f(a.id),animate:{rotateZ:(o.length-c-1)*4+r,scale:1+c*.06-o.length*.06,transformOrigin:"90% 90%"},initial:!1,transition:{type:"spring",stiffness:n.stiffness,damping:n.damping},style:{width:i.width,height:i.height},children:t.jsx("img",{src:a.img,alt:`card-${a.id}`,className:"card-image"})})},a.id)})})}const E=`import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import './Stack.css';

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
        ]
  );

  const sendToBack = id => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="card"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img src={card.img} alt={\`card-\${card.id}\`} className="card-image" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
`,O=`.stack-container {
  position: relative;
  perspective: 600px;
}

.card-rotate {
  position: absolute;
  cursor: grab;
}

.card {
  border-radius: 20px;
  border: 5px solid #fff;
  overflow: hidden;
}

.card-image {
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`,P=`import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
        ]
  );

  const sendToBack = id => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img src={card.img} alt={\`card-\${card.id}\`} className="w-full h-full object-cover pointer-events-none" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
`,V=`import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import './Stack.css';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
          { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
          { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
          { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
        ]
  );

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="stack-container"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="card"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img src={card.img} alt={\`card-\${card.id}\`} className="card-image" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
`,X=`import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format'
          },
          {
            id: 2,
            img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format'
          },
          {
            id: 3,
            img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format'
          },
          {
            id: 4,
            img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
          }
        ]
  );

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img src={card.img} alt={\`card-\${card.id}\`} className="w-full h-full object-cover pointer-events-none" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
`,Y={dependencies:"motion",usage:`import Stack from './Stack'

const images = [
  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
];
  
<Stack
  randomRotation={true}
  sensitivity={180}
  sendToBackOnClick={false}
  cardDimensions={{ width: 200, height: 200 }}
  cardsData={images}
/>`,code:E,css:O,tailwind:P,tsCode:V,tsTailwind:X},A=()=>{const[d,m]=g.useState(!1),[i,s]=g.useState(200),[n,h]=g.useState(208),[o,l]=g.useState(208),[f,a]=M(),c=[{name:"randomRotation",type:"boolean",default:!1,description:"Applies a random rotation to each card for a 'messy' look."},{name:"sensitivity",type:"number",default:200,description:"Drag sensitivity for sending a card to the back."},{name:"cardDimensions",type:"object",default:"{ width: 208, height: 208 }",description:"Defines the width and height of the cards."},{name:"sendToBackOnClick",type:"boolean",default:"false",description:"When enabled, the also stack shifts to the next card on click."},{name:"cardsData",type:"array",default:"[]",description:"The array of card data, including `id` and `img` properties."},{name:"animationConfig",type:"object",default:"{ stiffness: 260, damping: 20 }",description:"Configures the spring animation's stiffness and damping."}],r=[{id:1,img:"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"},{id:2,img:"https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"},{id:3,img:"https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"},{id:4,img:"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"}];return t.jsxs(x,{children:[t.jsxs(k,{children:[t.jsx(y,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:t.jsx(N,{randomRotation:d,sensitivity:i,cardDimensions:{width:n,height:o},cardsData:r},f)}),t.jsxs(B,{children:[t.jsx(S,{title:"Random Rotation",isChecked:d,onChange:e=>{m(e),a()}}),t.jsx(p,{title:"Sensitivity",min:100,max:300,step:10,value:i,onChange:e=>{s(e),a()}}),t.jsx(p,{title:"Card Width",min:150,max:300,step:10,value:n,onChange:e=>{h(e),a()},displayValue:e=>`${e}px`}),t.jsx(p,{title:"Card Height",min:150,max:300,step:10,value:o,onChange:e=>{l(e),a()},displayValue:e=>`${e}px`})]}),t.jsx(T,{data:c}),t.jsx(q,{dependencyList:["motion"]})]}),t.jsx(D,{children:t.jsx(R,{codeObject:Y})})]})};export{A as default};
