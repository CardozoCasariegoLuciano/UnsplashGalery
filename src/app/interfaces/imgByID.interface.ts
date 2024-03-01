export interface ImageByID {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: ImageByIDLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  topic_submissions: ImageByIDTopicSubmissions;
  user: User;
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  tags: ImageByIDTag[];
  tags_preview: TagsPreview[];
  views: number;
  downloads: number;
  topics: any[];
  related_collections: RelatedCollections;
}

export interface Exif {
  make: null;
  model: null;
  name: null;
  exposure_time: null;
  aperture: null;
  focal_length: string;
  iso: null;
}

export interface ImageByIDLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Location {
  name: string;
  city: null;
  country: null;
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Meta {
  index: boolean;
}

export interface RelatedCollections {
  total: number;
  type: string;
  results: Result[];
}

export interface Result {
  id: string;
  title: string;
  description: null;
  published_at: Date;
  last_collected_at: Date;
  updated_at: Date;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: ResultTag[];
  links: ResultLinks;
  user: User;
  cover_photo: ResultCoverPhoto;
  preview_photos: PreviewPhoto[];
}

export interface ResultCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: ImageByIDLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: PurpleTopicSubmissions;
  user: User;
}

export interface PurpleTopicSubmissions {
  nature?: Nature;
}

export interface Nature {
  status: Status;
  approved_on: Date;
}

export enum Status {
  Approved = 'approved',
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: null | string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}

export interface ResultLinks {
  self: string;
  html: string;
  photos: string;
  related: string;
}

export interface PreviewPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  blur_hash: string;
  urls: Urls;
}

export interface ResultTag {
  type: Type;
  title: string;
  source?: PurpleSource;
}

export interface PurpleSource {
  ancestry: PurpleAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: PurpleCoverPhoto;
}

export interface PurpleAncestry {
  type: Category;
  category?: Category;
  subcategory?: Category;
}

export interface Category {
  slug: string;
  pretty_slug: string;
}

export interface PurpleCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: ImageByIDLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: FluffyTopicSubmissions;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface Breadcrumb {
  slug: string;
  title: string;
  index: number;
  type: Type;
}

export enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

export interface FluffyTopicSubmissions {
  nature?: Nature;
  wallpapers?: Nature;
  'architecture-interior'?: Nature;
  'color-of-water'?: Nature;
  'current-events'?: Nature;
}

export interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: User;
}

export interface ImageByIDTag {
  type: Type;
  title: string;
  source?: FluffySource;
}

export interface FluffySource {
  ancestry: PurpleAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: FluffyCoverPhoto;
}

export interface FluffyCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: ImageByIDLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: FluffyTopicSubmissions;
  premium?: boolean;
  plus?: boolean;
  user: User;
}

export interface TagsPreview {
  type: Type;
  title: string;
  source?: TagsPreviewSource;
}

export interface TagsPreviewSource {
  ancestry: FluffyAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: TentacledCoverPhoto;
}

export interface FluffyAncestry {
  type: Category;
}

export interface TentacledCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: ImageByIDLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: TentacledTopicSubmissions;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface TentacledTopicSubmissions {
  nature: Nature;
  wallpapers: Nature;
}

export interface ImageByIDTopicSubmissions {}
