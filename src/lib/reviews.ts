// Student reviews for the homepage testimonials marquee.
//
// SOURCE: copied from the NovaNxt Lab Google Business Profile on 2026-11-19 (text verbatim; names
// title-cased for display). Left out: a review that was about a different institute, a review
// with an unsuitable display name, and two rating-only reviews with no text.
// Star ratings weren't included in the copy — add `rating` per review when known (cards show
// stars only when a rating is set). Relative dates ("3 months ago") are omitted because they go stale.
//
// LATER: replace `getReviews()` with a cached fetch from the Google Places API
// (Place Details → `reviews`: authorAttribution.displayName, rating, text.text,
// relativePublishTimeDescription). The `Review` shape maps 1:1 to those fields.
//
// Rule: never publish made-up reviews.

export type Review = {
  author: string;
  text: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  course?: string; // only when the reviewer names it
  when?: string;
  source: "google";
};

export const reviews: Review[] = [
  {
    author: "Roshni Gupta",
    text: "One of the best places i have been to learn computer basics as well as advanced tools. The place really harbours an environment which is student friendly. It offers a professional team for teaching the students their respective courses as well as provides great infrastructure. Overall an amazing experience. I learned a lot of valuable things from here which is going to really help me in my future career related endeavors",
    source: "google",
  },
  {
    author: "Sagar Rawool",
    text: "Classes were amazing I learnt so much and with such ease it has all the topics that can make you up to date with the current trends in the business I am extremely happy with the course 😊",
    source: "google",
  },
  { author: "Nikita Chavan", text: "Best teacher are there to teach. Im learn Java and Ai. High recommended in kandivali.", course: "Java + AI", source: "google" },
  {
    author: "Mohammed Patel",
    text: "The best computer classes. I learnt alot about Frontend development in this class. It was a great experience!!",
    course: "Frontend development",
    source: "google",
  },
  {
    author: "Shawn Bangera",
    text: "A great computer institute...I had wonderful time learning new skills here ....the teachers and staff are very cooperative and their guidance were pretty helpful.",
    source: "google",
  },
  { author: "Shaan Revan", text: "Nice experience doing my java course , everyone’s really cooperative", course: "Java", source: "google" },
  { author: "Suraj Yadav", text: "Very nice classes n the faculty teaching in a very patient manner with good examples n real life skills", source: "google" },
  { author: "Heyansh", text: "The kids course is superrr fun!!!", course: "Kids course", source: "google" },
  { author: "Dhruvi Patkar", text: "The teacher here teaches calmly and patiently. She explains really well.", source: "google" },
  { author: "Shashank Tiwari", text: "Did my python course here , got along well with staff and other students", course: "Python", source: "google" },
  { author: "Mehak Mishra", text: "the best computer classes in kandivali with expert faculty. had a great time learning here", source: "google" },
  {
    author: "Kanchan",
    text: "Very Budget Friendly courses ,compare to other classes in mahavir nagar kandivali. very friendly and Sincere Counselors are.",
    source: "google",
  },
  { author: "Gauri Tambat", text: "Very experienced and humble educators in the academy. NovaNxt Lab is highly recommend the best", source: "google" },
  { author: "Truth K", text: "The faculty is really good. Best place for learning computer and AI", source: "google" },
  { author: "Lustforlife", text: "Course was super fun the teacher and the lady at the desk were helpful", source: "google" },
  { author: "Jyoti Mane", text: "This faculty is good . One of best classes for your children", source: "google" },
  {
    author: "Ashok Sarda",
    text: "As a student, I had a great experience with Nova NXT Lab. The learning environment was supportive and the guidance was valuable.",
    source: "google",
  },
  { author: "Sarvesh Bane", text: "Highly recommended\nNice ambiance and teaching is too good.", source: "google" },
  { author: "Mayur Mhatre", text: "Trainers are very good. I enjoy learning with them.", source: "google" },
  { author: "Madhura Kesarkar", text: "excellent counseler, very patient explanations.", source: "google" },
  { author: "Sandesh Nat", text: "Best classes. Teacher are very supportive.", source: "google" },
  { author: "Nai Parbin", text: "Best Computer class in Kandivali! Had wonderful time learning here.", source: "google" },
  { author: "Aman Dubal", text: "Best computer class in kandivali.", source: "google" },
  { author: "Rupa Kherwal", text: "Very nice experience", source: "google" },
];

/** Google Business Profile reviews link ("See us on Google"). TODO: paste the profile's review URL. */
export const googleReviewsUrl: string | null = null;

export function getReviews(): Review[] {
  return reviews;
}
