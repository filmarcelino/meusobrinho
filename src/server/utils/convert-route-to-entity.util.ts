const mapping: Record<string, string> = {
  'elderly-user-profiles': 'elderly_user_profile',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
