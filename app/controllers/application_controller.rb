class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include ApplicationHelper
  helper_method :us_states
  helper_method :us_country
  def us_states
  	[
    ['AK', 'AK'],
    ['AL', 'AL'],
    ['AR', 'AR'],
    ['AZ', 'AZ'],
    ['CA', 'CA'],
    ['CO', 'CO'],
    ['CT', 'CT'],
    ['DC', 'DC'],
    ['DE', 'DE'],
    ['FL', 'FL'],
    ['GA', 'GA'],
    ['HI', 'HI'],
    ['IA', 'IA'],
    ['ID', 'ID'],
    ['IL', 'IL'],
    ['IN', 'IN'],
    ['KS', 'KS'],
    ['KY', 'KY'],
    ['LA', 'LA'],
    ['MA', 'MA'],
    ['MD', 'MD'],
    ['ME', 'ME'],
    ['MI', 'MI'],
    ['MN', 'MN'],
    ['MO', 'MO'],
    ['MS', 'MS'],
    ['MT', 'MT'],
    ['NC', 'NC'],
    ['ND', 'ND'],
    ['NE', 'NE'],
    ['NH', 'NH'],
    ['NJ', 'NJ'],
    ['NM', 'NM'],
    ['NV', 'NV'],
    ['NY', 'NY'],
    ['OH', 'OH'],
    ['OK', 'OK'],
    ['OR', 'OR'],
    ['PA', 'PA'],
    ['RI', 'RI'],
    ['SC', 'SC'],
    ['SD', 'SD'],
    ['TN', 'TN'],
    ['TX', 'TX'],
    ['UT', 'UT'],
    ['VA', 'VA'],
    ['VT', 'VT'],
    ['WA', 'WA'],
    ['WI', 'WI'],
    ['WV', 'WV'],
    ['WY', 'WY']
  ]
end
def us_country
    [
    ['US','US']
    ]
   
	end
end
