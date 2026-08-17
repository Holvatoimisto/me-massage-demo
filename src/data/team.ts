// Centralized staff data, shared by the service pages and the location
// pages. Staff/location assignment is the best-supported reading of the
// current memassage.fi content: Mathias serves both locations, Janina serves
// Klaukkala. NEEDS MATHIAS CONFIRMATION — keep assignments here so one edit
// updates every page.
export interface TeamMember {
  id: 'mathias' | 'janina';
  name: string;
  /** Translation key for the role/title line. */
  titleKey: string;
  /** Translation key for the short bio (homepage team section). */
  bioKey: string;
  image: string;
  /** Locations where this member sees clients. */
  locations: ('klaukkala' | 'vaasa')[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'mathias',
    name: 'Mathias Eklund',
    titleKey: 'team.mathias.title',
    bioKey: 'team.mathias.bio',
    image: '/assets/me_mathias.jpg',
    locations: ['klaukkala', 'vaasa'],
  },
  {
    id: 'janina',
    name: 'Janina Honkanen',
    titleKey: 'team.janina.title',
    bioKey: 'team.janina.bio',
    image: '/assets/me_janina.png',
    locations: ['klaukkala'],
  },
];

export const teamAtLocation = (slug: 'klaukkala' | 'vaasa'): TeamMember[] =>
  teamMembers.filter((member) => member.locations.includes(slug));
