import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '500px'
            })),
            animate('800ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),
]

export const DetailsInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': 'max-content', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('600ms ease-in-out', style({
                'max-height': 'max-content'
            })),
            animate('800ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),
]

export const SlideInRightAnimation = [
    trigger('slideInRight', [
        state('in', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible','max-width':'fit-content','width':'fit-content'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'display': 'none','max-width':'0px','width':'0px'
        })),
        transition('in => out', [group([
            animate('300ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('300ms ease-in-out', style({
                'max-height': '0px','max-width':'0px','width':'0px','display':'none'
            })),
            animate('310ms ease-in', style({
                'visibility': 'hidden','max-width':'0px','width':'0px','display':'none'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('300ms ease-in-out', style({
                'visibility': 'visible','display':'initial'
            })),
            animate('300ms ease-in-out', style({
                'max-height': '500px','max-width':'fit-content','width':'fit-content',
            })),
            animate('350ms ease-in-out', style({
                'opacity': '1','max-width':'fit-content','width':'fit-content'
            }))
        ]
        )])
    ]),
]