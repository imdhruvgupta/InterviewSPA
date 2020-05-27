class AddStartToSession < ActiveRecord::Migration[5.2]
  def change
    add_column :sessions, :start, :datetime
  end
end
