module Katello
  class Api::V2::FruitsController < Api::V2::ApiController
    before_action :set_fruit, only: [:show, :edit, :update, :destroy]

    # GET /fruits
    api :GET, "/fruits", N_("Show tasty fruits")
    def index
      respond(:collection => scoped_search(Fruit.all, :name, :asc))
    end

    # GET /fruits/1
    api :GET, "/fruits/:id", N_("Show a tasty fruit")
    param :id, :number, :desc => N_("fruit identifier"), :required => true
    def show
      respond_for_show(:resource => @fruit)
    end

    # GET /fruits/new
    def new
      @fruit = Fruit.new
    end

    # GET /fruits/1/edit
    def edit
    end

    # POST /fruits
    def create
      @fruit = Fruit.new(fruit_params)

      if @fruit.save
        respond_for_show(:resource => @fruit)
      else
        render :new
      end
    end

    # PATCH/PUT /fruits/1
    def update
      if @fruit.update(fruit_params)
        respond_for_show(:resource => @fruit)
      else
        render :edit
      end
    end

    # DELETE /fruits/1
    def destroy
      @fruit.destroy
      redirect_to fruits_url, notice: 'Fruit was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_fruit
        @fruit = Fruit.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def fruit_params
        params.require(:fruit).permit(:name, :color)
      end
  end
end
