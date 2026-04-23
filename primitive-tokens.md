# Primitive Tokens

Raw design values - foundation of the design system.

## Color scale

---

### Neutral

```css
:root {
  /* 中性色Neutral / Light */
  --color-neutral-00:  #FFFFFF;
  --color-neutral-10:  #FAFAFA;
  --color-neutral-20:  #F7F7F7;
  --color-neutral-30:  #F0F0F0;
  --color-neutral-40:  #E7E7E7;
  --color-neutral-50:  #E6E6E6;
  --color-neutral-60:  #E8E8E8;
  --color-neutral-70:  #E0E0E0;
  --color-neutral-80:  #CCCCCC;
  --color-neutral-90:  #C2C2C2;
  --color-neutral-100: #BFBFBF;
  --color-neutral-110: #A7A7A7;
  --color-neutral-120: #999999;
  --color-neutral-130: #858585;
  --color-neutral-140: #666666;
  --color-neutral-150: #555555;
  --color-neutral-160: #4E4E4E;
  --color-neutral-170: #222222;
  --color-neutral-180: #1B1B1B;
 }
```

### Green

```css
:root {   
/* 绿色Green / Light */
  --color-green-10: #E6F7EF;
  --color-green-20: #D6F4E3;
  --color-green-30: #7DDDA5;
  --color-green-40: #2ABB70;
  --color-green-50: #09AA5C;
  --color-green-60: #069353;
}
```

### Yellow

```css
:root {   
  /* 黄色Yellow / Light */
  --color-yellow-10: #FFF7E8;
  --color-yellow-20: #FFF5DB;
  --color-yellow-30: #FFE493;
  --color-yellow-40: #FFC23E;
  --color-yellow-50: #FFAD14;
  --color-yellow-60: #D2860C;
}
```

### Red

```css
:root {   
  /* 红色Red / Light */
  --color-red-10: #FEEDED;
  --color-red-20: #FDE4E1;
  --color-red-30: #F9AFA5;
  --color-red-40: #F46C65;
  --color-red-50: #F14846;
  --color-red-70: #C82C2E;
}
```

### Blue

```css
:root {  
  /* 蓝色Blue / Light */
  --color-blue-10: #ECF2FC;
  --color-blue-20: #E0ECFB;
  --color-blue-30: #A0C6F4;
  --color-blue-40: #5E93E9;
  --color-blue-50: #3F78E4;
  --color-blue-60: #2757BE;
}
```

### Deep Blue

```css
:root {    
  /* 深蓝色 Deep Blue / Light */
  --color-deep-blue-10: #A3BBDF;
  --color-deep-blue-20: #6985BF;
  --color-deep-blue-30: #506DAF;
  --color-deep-blue-40: #344E96;
}
```

### Orange

```css
:root {
  /* 橘色 orange / Light */
  --color-orange-10: #FFE6BA;
  --color-orange-20: #FFCD99;
  --color-orange-30: #FF9A33;
  --color-orange-40: #FF8100;
  --color-orange-50: #D26200;
}
```

### 遮罩 Mask

```css
 :root {
  /* 遮罩Mask / Light */
  --color-mask-default: rgba(0, 0, 0, 0.3);
}
```

## Spacing scale

---

4px base unit system.

```css
 :root {
  --space-0:   0;
  --space-px:  1px;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1:   0.25rem;   /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2:   0.5rem;    /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3:   0.75rem;   /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-7:   1.75rem;   /* 28px */
  --space-8:   2rem;      /* 32px */
  --space-9:   2.25rem;   /* 36px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-14:  3.5rem;    /* 56px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
}
```

## **Typography Scale**

---

```css
 :root {
/* Font Sizes */
  --font-size-xs:   0.75rem;   /* 12px */
  --font-size-sm:   0.875rem;  /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg:   1.125rem;  /* 18px */
  --font-size-xl:   1.25rem;   /* 20px */
  --font-size-2xl:  1.5rem;    /* 24px */
  --font-size-3xl:  1.875rem;  /* 30px */
  --font-size-4xl:  2.25rem;   /* 36px */
  --font-size-5xl:  3rem;      /* 48px */

  /* Line Heights */
  --leading-none:   1;
  --leading-tight:  1.25;
  --leading-snug:   1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose:  2;

  /* Font Weights */
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight:   -0.025em;
  --tracking-normal:  0;
  --tracking-wide:    0.025em;
  --tracking-wider:   0.05em;
}
```

## **Border Radius**

---

```css
 :root {
  --radius-none:    0;
  --radius-sm:      0.125rem;  /* 2px */
  --radius-default: 0.25rem;   /* 4px */
  --radius-md:      0.375rem;  /* 6px */
  --radius-lg:      0.5rem;    /* 8px */
  --radius-xl:      0.75rem;   /* 12px */
  --radius-2xl:     1rem;      /* 16px */
  --radius-3xl:     1.5rem;    /* 24px */
  --radius-full:    9999px;
}
```

## **Shadows**

---

```css
 :root {
  --shadow-none: none;
  --shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.1),
                    0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1),
                 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1),
                 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1),
                 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

## **Motion / Duration**

---

```css
 :root {
  --duration-75:  75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;

  /* Semantic durations */
  --duration-fast:   var(--duration-150);
  --duration-normal: var(--duration-200);
  --duration-slow:   var(--duration-300);
}
```

## **Z-Index Scale**

---

```css
 :root {
  --z-auto:     auto;
  --z-0:        0;
  --z-10:       10;
  --z-20:       20;
  --z-30:       30;
  --z-40:       40;
  --z-50:       50;
  --z-dropdown: 1000;
  --z-sticky:   1100;
  --z-modal:    1200;
  --z-popover:  1300;
  --z-tooltip:  1400;
}
```

