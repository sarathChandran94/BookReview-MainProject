import { trigger, transition, style, animate, state, query, group } from "@angular/animations";

export const zoomAnimation = trigger('zoomAnimation', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0) translateY(100%)'
            }),
        ]),
        query(':enter', [
            animate('1000ms ease',
                style({
                    opacity: 1,
                    transform: 'scale(1) translateY(0)'
                })),
        ])
    ]),
    // transition('* <=> SingleBook', [
    //     query(':enter, :leave', [
    //         style({
    //             position: 'absolute',
    //             left: 0,
    //             width: '100%',
    //             opacity: 0,
    //             transform: 'scale(0) translateY(100%)'
    //         }),
    //     ]),
    //     query(':enter', [
    //         animate('1000ms ease',
    //             style({
    //                 opacity: 1,
    //                 transform: 'scale(1) translateY(0)'
    //             })),
    //     ])
    // ]),

]);


export const slideInAnimation =
    trigger('routeAnimations', [
        //  transition('* => Home', [
        //       query(':enter, :leave',
        //            style({ position: 'fixed', width: '100%' }),
        //            { optional: true }),
        //       group([
        //            query(':enter',[
        //                style({ transform: 'translateX(-100%)' }),
        //                animate('0.5s ease-in-out',
        //                style({ transform: 'translateX(0%)' }))
        //            ], { optional: true }),
        //            query(':leave', [
        //                style({ transform:   'translateX(0%)'}),
        //                animate('0.5s ease-in-out',
        //                style({ transform: 'translateX(100%)' }))
        //            ], { optional: true }),
        //       ])
        //  ]),
         transition('* <=> *', [
              query(':enter, :leave',
                   style({ position: 'fixed',  width: '100%' }),
                   { optional: true }),
              group([
                  query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.2s', style({ opacity: 1 }))
                   ], { optional: true }),
                  query(':leave', [
                    style({ opacity: 1 }),
                    animate('0.2s', style({ opacity: 0 }))
                ], { optional: true }),
               ])
         ]),

 ]);

 export const fadeAnimation =

 trigger('routeAnimations', [

     transition( '* => *', [

         query(':enter',
             [
                 style({ opacity: 0 })
             ],
             { optional: true }
         ),

         query(':leave',
             [
                 style({ opacity: 1 }),
                 animate('0.2s', style({ opacity: 0 }))
             ],
             { optional: true }
         ),

         query(':enter',
             [
                 style({ opacity: 0 }),
                 animate('0.2s', style({ opacity: 1 }))
             ],
             { optional: true }
         )

     ])

 ]);
