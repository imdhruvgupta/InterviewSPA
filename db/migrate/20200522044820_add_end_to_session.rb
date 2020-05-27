class AddEndToSession < ActiveRecord::Migration[5.2]
  def change
    add_column :sessions, :end, :datetime
  end
end
