FactoryBot.define do
  factory :message do
    contents {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/hero-img.png")}
    user
    group
  end
end