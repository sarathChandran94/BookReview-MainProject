import { trigger, transition, style, animate, state } from "@angular/animations";

export const expandCollapse = trigger('expandCollapse', [
    state('*', style({
        'overflow-y': 'hidden',
        'height': '*'
    })),
    state('void', style({
        'height': '0',
        'overflow-y': 'hidden'
    })),
    transition('* => void', animate('350ms ease-out')),
    transition('void => *', animate('350ms ease-in'))
]);

export const zoomAnim = trigger('zoomAnim', [
    state('void', style({
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
    })),
    transition('* => void', animate('350ms ease')),
    transition('void => *', animate('350ms ease'))
]);
