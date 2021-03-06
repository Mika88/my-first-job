# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_09_164948) do

  create_table "job_posts", force: :cascade do |t|
    t.string "post_type"
    t.string "job_type", default: "{}"
    t.string "description"
    t.string "location"
    t.integer "salary"
    t.string "creator_name"
    t.string "creator_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.string "reviewer_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "job_post_id"
  end

end
