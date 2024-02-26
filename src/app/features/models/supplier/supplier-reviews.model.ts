export interface SupplierGoogleReviewsModel {
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: string;
  };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

export interface SupplierGoogleRatingModel {
  googleRating: number;
}
